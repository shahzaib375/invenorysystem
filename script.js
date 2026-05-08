
/* ---- USERS ---- */
const USERS={admin:{pass:'1234',name:'Admin',role:'Super Admin',av:'AD'},manager:{pass:'5678',name:'Manager',role:'Manager',av:'MG'},accountant:{pass:'0000',name:'Zahid',role:'Accountant',av:'ZA'},salesman:{pass:'9999',name:'Salesman',role:'Salesman',av:'SM'}};

function doLogin(){
  const u=document.getElementById('lu').value.trim().toLowerCase();
  const p=document.getElementById('lp').value.trim();
  if(USERS[u]&&USERS[u].pass===p){
    document.getElementById('lw').style.display='none';
    document.getElementById('app').classList.add('show');
    const us=USERS[u];
    document.getElementById('sbname').textContent=us.name;
    document.getElementById('sbrole').textContent=us.role;
    document.getElementById('sbav').textContent=us.av;
    document.getElementById('lerr').style.display='none';
  } else {
    document.getElementById('lerr').style.display='block';
  }
}
['lu','lp'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')doLogin()}));

function doLogout(){
  document.getElementById('app').classList.remove('show');
  document.getElementById('lw').style.display='flex';
  document.getElementById('lp').value='';
}

/* ---- DATE ---- */
document.getElementById('pdate').textContent=new Date().toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short',year:'numeric'});

/* ---- NAV ---- */
const titles={dashboard:'Dashboard',sales:'Sales / Invoice',purchase:'Purchase',inventory:'Inventory / Stock',customers:'Customers',suppliers:'Suppliers',salesmen:'Salesmen',accounts:'Accounts',recovery:'Recovery System',expenses:'Expenses',salary:'Salary & HR',ledger:'Ledger & Cashbook',reports:'Reports',roles:'User Roles'};
function ni(name){return document.querySelector(`.ni[onclick*="${name}"]`)}
function go(name,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.getElementById('ptitle').textContent=titles[name]||name;
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('active'));
  if(el)el.classList.add('active');
}

/* ---- MODALS ---- */
function closeM(id){document.getElementById(id).classList.remove('open')}
document.querySelectorAll('.mbg').forEach(m=>m.addEventListener('click',function(e){if(e.target===this)this.classList.remove('open')}));

/* ---- PRINT ---- */
function showPrint(){document.getElementById('m-print').classList.add('open')}
function showPurchPrint(){document.getElementById('m-pprint').classList.add('open')}

/* ---- SALE FORM ---- */
function openSale(){document.getElementById('sale-form').style.display='block';document.getElementById('sale-list').style.display='none'}
function postInvoice(){
  if(confirm('Invoice INV-0893 post karein?')){
    document.getElementById('sale-form').style.display='none';
    document.getElementById('sale-list').style.display='block';
    showPrint();
  }
}

/* ---- PURCHASE ---- */
function openPurch(){document.getElementById('purch-form').style.display='block';document.getElementById('purch-list').style.display='none'}

/* ---- ADD ROWS ---- */
let src=2,prc=2;
function addSaleRow(){
  src++;
  const t=document.getElementById('sale-rows');
  const tr=document.createElement('tr');
  tr.innerHTML=`<td class="rn">${src}</td><td><input type="text" placeholder="Code" style="width:58px"></td><td class="lft"><input type="text" placeholder="Product name..."></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0" readonly></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><button class="dlb" onclick="this.closest('tr').remove()"><i class="ti ti-trash" style="font-size:11px"></i></button></td>`;
  t.appendChild(tr);
}
function addPurchRow(){
  prc++;
  const t=document.getElementById('purch-rows');
  const tr=document.createElement('tr');
  tr.innerHTML=`<td class="rn">${prc}</td><td><input type="text" placeholder="Code" style="width:58px"></td><td class="lft"><input type="text" placeholder="Product..."></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0" readonly></td><td><input type="number" value="0"></td><td><input type="number" value="0" readonly></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><input type="number" value="0"></td><td><button class="dlb" onclick="this.closest('tr').remove()"><i class="ti ti-trash" style="font-size:11px"></i></button></td>`;
  t.appendChild(tr);
}

/* ---- TABS ---- */
document.querySelectorAll('.ptabs').forEach(wrap=>{
  wrap.querySelectorAll('.ptab').forEach(tab=>{
    tab.addEventListener('click',()=>{wrap.querySelectorAll('.ptab').forEach(t=>t.classList.remove('active'));tab.classList.add('active')});
  });
});

/* ---- ACCOUNTS LEFT MENU ---- */
function showAcc(id,el){
  document.querySelectorAll('.acc-panel').forEach(p=>p.classList.remove('active'));
  const panel=document.getElementById('acc-'+id);
  if(panel)panel.classList.add('active');
  document.querySelectorAll('.acc-menu-item').forEach(m=>m.classList.remove('active'));
  if(el)el.classList.add('active');
}

/* ---- PRODUCT MODAL ---- */
function editProd(code,name){
  document.getElementById('ep-code').value=code;
  document.getElementById('ep-name').value=name;
  document.getElementById('ep-title').textContent=code;
  document.getElementById('m-editprod').classList.add('open');
}
function saveProd(){alert('Product saved to inventory!');closeM('m-addprod')}
function editCust(){document.getElementById('m-addcust').classList.add('open')}

/* ---- REPORTS PERIOD ---- */
const rdata={daily:{s:'2,47,500',e:'24,800',r:'87,000',p:'1,02,700',ss:'Today — 23 invoices',es:'Today — 7 entries',rs:'Cash today',ps:'Sales−Purch−Exp',t:'Today (07 May 2026)'},weekly:{s:'14,82,000',e:'1,12,400',r:'3,24,000',p:'6,18,000',ss:'Week — 148 invoices',es:'Week — 31 entries',rs:'Cash this week',ps:'Est. weekly',t:'01–07 May 2026'},monthly:{s:'58,40,000',e:'4,28,000',r:'12,40,000',p:'24,20,000',ss:'May — 612 invoices',es:'Month — 124 entries',rs:'Cash this month',ps:'Est. monthly',t:'May 2026'}};
function setRep(el,period){
  document.querySelectorAll('.pbtn').forEach(b=>b.classList.remove('active'));el.classList.add('active');
  const d=rdata[period];
  document.getElementById('r-s').textContent=d.s;document.getElementById('r-e').textContent=d.e;
  document.getElementById('r-r').textContent=d.r;document.getElementById('r-p').textContent=d.p;
  document.getElementById('r-ss').textContent=d.ss;document.getElementById('r-es').textContent=d.es;
  document.getElementById('r-rs').textContent=d.rs;document.getElementById('r-ps').textContent=d.ps;
  document.getElementById('rep-title').textContent='Salesman Wise — '+d.t;
}
