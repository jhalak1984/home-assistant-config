(()=>{'use strict';
const cfg=window.JR_SITE_CONFIG||{};
const blogInput=document.getElementById('blogSearch');const posts=[...document.querySelectorAll('#blog article.card')];
blogInput?.addEventListener('input',()=>{const q=blogInput.value.trim().toLowerCase();let n=0;for(const p of posts){const yes=p.textContent.toLowerCase().includes(q);p.hidden=!yes;if(yes)n++}document.getElementById('blogCount').textContent=`${n} article${n===1?'':'s'} found`});
const copy=async txt=>{await navigator.clipboard.writeText(txt)};
document.querySelectorAll('[data-copy-target]').forEach(b=>b.addEventListener('click',async()=>{try{await copy(document.getElementById(b.dataset.copyTarget).textContent);b.textContent='Copied ✓';setTimeout(()=>b.textContent='Copy DNS results',1600)}catch{b.textContent='Select text to copy'}}));
// Add usable code examples with copy buttons to technical articles, without exposing private infrastructure.
const snippets={powershell:'Get-ExecutionPolicy -List\nGet-AuthenticodeSignature -FilePath .\\Toolkit.ps1',exchange:'Get-MigrationBatch | Format-Table Identity,Status,TotalCount\nGet-MigrationUser | Format-Table Identity,Status',vlan:'# Example: inspect interfaces on a Linux host\nip -br addr\nip route',proxmox:'pveversion\npvesm status',remote:'tailscale status',homeassistant:'# Check the Home Assistant system logs\n# Settings → System → Logs'};
const articleView=document.getElementById('articleView');const observer=new MutationObserver(()=>{const close=articleView.querySelector('#closeArticle');if(!close||articleView.querySelector('.code-snippet'))return;const title=articleView.querySelector('h3')?.textContent;const key=Object.keys(snippets).find(k=>({powershell:'Safer PowerShell script execution',exchange:'Exchange hybrid migration checklist',vlan:'VLANs, tagged ports and trunks',proxmox:'Two-node Proxmox: what to consider',remote:'Remote access without port forwarding',homeassistant:'Designing safer remote access'})[k]===title);if(!key)return;const wrap=document.createElement('div');wrap.className='code-snippet';const pre=document.createElement('pre');pre.textContent=snippets[key];const btn=document.createElement('button');btn.className='ghost copy-code';btn.textContent='Copy code';btn.onclick=async()=>{try{await copy(pre.textContent);btn.textContent='Copied ✓'}catch{btn.textContent='Copy unavailable'}};wrap.append(pre,btn);articleView.append(wrap)});observer.observe(articleView,{childList:true});
const dnsForm=document.getElementById('dnsForm');dnsForm?.addEventListener('submit',async e=>{e.preventDefault();const out=document.getElementById('dnsResult');out.textContent='Checking DNS…';const domain=dnsForm.domain.value.trim().toLowerCase().replace(/\.$/,'');const type=dnsForm.type.value;if(!/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain)){out.textContent='Enter a valid public domain (example.com).';return}try{let j;try{const r=await fetch(`/api/dns?domain=${encodeURIComponent(domain)}&type=${encodeURIComponent(type)}`,{signal:AbortSignal.timeout(10000)});j=await r.json();if(!r.ok||!Array.isArray(j.answers))throw Error('Pages DNS function is unavailable.')}catch{const r=await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${encodeURIComponent(type)}`,{headers:{Accept:'application/dns-json'},signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error(`DNS resolver returned HTTP ${r.status}`);const result=await r.json();j={status:result.Status,answers:(result.Answer||[]).map(a=>({name:a.name,type,ttl:a.TTL,data:a.data}))}}out.textContent=(j.answers||[]).length?j.answers.map(a=>`${a.name}  ${a.type}  TTL ${a.ttl}  ${a.data}`).join('\n'):`No ${type} records returned (DNS status ${j.status}).`}catch(err){out.textContent=`Lookup failed: ${err.message}.`}});
const user=(cfg.githubUsername||'').trim();
const githubStatus=document.getElementById('githubStatus');
if(/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(user)){
  document.getElementById('githubProfileLink').href=`https://github.com/${user}`;
  githubStatus.textContent=`Loading public repositories by @${user}…`;
  (async()=>{
    const repos=[];
    const seen=new Set();
    for(let page=1;;page++){
      const response=await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?type=owner&sort=updated&per_page=100&page=${page}`,{headers:{Accept:'application/vnd.github+json'}});
      if(!response.ok)throw Error(`GitHub returned ${response.status}`);
      const batch=await response.json();
      if(!Array.isArray(batch))throw Error('Unexpected GitHub response');
      for(const repo of batch){
        if(!repo.private&&!seen.has(repo.id)){seen.add(repo.id);repos.push(repo)}
      }
      if(batch.length<100)break;
    }
    const box=document.getElementById('githubRepos');
    box.replaceChildren();
    for(const repo of repos){
      const a=document.createElement('a');
      a.className='card repo-card';a.href=repo.html_url;a.target='_blank';a.rel='noopener noreferrer';
      const tag=document.createElement('span');tag.className='tag';tag.textContent=repo.language||'PROJECT';
      const h=document.createElement('h3');h.textContent=repo.name;
      const p=document.createElement('p');p.textContent=repo.description||'View this repository on GitHub.';
      const small=document.createElement('small');
      small.textContent=`★ ${repo.stargazers_count} · Updated ${new Date(repo.updated_at).toLocaleDateString()}${repo.fork?' · Fork':''}`;
      a.append(tag,h,p,small);box.append(a);
    }
    githubStatus.textContent=repos.length?`${repos.length} public ${repos.length===1?'repository':'repositories'} by @${user}`:`No public repositories found for @${user}.`;
  })().catch(err=>{githubStatus.textContent=`Could not load GitHub projects: ${err.message}. Visit GitHub to see all repositories.`});
}
const contact=document.getElementById('contactForm');const status=document.getElementById('contactStatus');const key=(cfg.turnstileSiteKey||'').trim();if(key){const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js';script.async=true;script.defer=true;document.head.append(script);const widget=document.createElement('div');widget.className='cf-turnstile';widget.dataset.sitekey=key;document.getElementById('turnstileSlot').append(widget)}else status.textContent='Contact form is not activated yet. Set up Turnstile and email delivery using the README.';
contact?.addEventListener('submit',async e=>{e.preventDefault();if(!key){status.textContent='Contact form is not configured yet. Please try again later.';return}const btn=contact.querySelector('[type=submit]');btn.disabled=true;status.textContent='Sending…';try{const payload=Object.fromEntries(new FormData(contact));const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const j=await r.json();if(!r.ok)throw Error(j.error||'Message could not be sent');status.textContent='Message sent successfully. Thank you!';contact.reset();window.turnstile?.reset()}catch(err){status.textContent=`Could not send: ${err.message}`;}finally{btn.disabled=false}});
})();
