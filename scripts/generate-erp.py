from pathlib import Path
from datetime import date,timedelta
import random,json
r=random.Random(13192026);base=date(2026,11,20)
add=lambda d,n:(d+timedelta(days=n)).isoformat()
parts=[('housing','SS-CST-131','APU cast housing','Casting','s1',165,6800,'disk',1000),('bearing','SS-BRG-131','Precision bearing','Bearing','s2',90,1450,'bearing',2000),('bolt','SS-BOLT-131','Drilled-head fastener','Hardware','s3',28,42,'fastener',12000),('liner','SS-LNR-131','Combustor liner','Hot-section hardware','s1',150,29750,'liner',1000),('forging','SS-FRG-210','Turbine disk forging','Forging','s4',210,18500,'disk',180),('shaft','SS-SFT-052','Accessory drive shaft','Machined component','s4',120,5700,'disk',240),('seal','SS-SEL-118','Accessory seal kit','Expendable','s3',35,155,'seal',960),('fuel','SS-FCU-310','Fuel control unit','Rotable','s5',75,22400,'pump',96),('starter','SS-STG-027','Starter generator','Rotable','s5',65,18200,'generator',120),('igniter','SS-IGN-041','Ignition exciter','Electrical','s2',48,4800,'generator',144),('valve','SS-VLV-052','Pneumatic control valve','Pneumatic','s6',82,8600,'pump',180),('sensor','SS-EGT-073','Exhaust temperature sensor','Sensor','s2',55,1800,'generator',360),('apu','SS-APU-901','Service APU assembly','Complete APU','s5',75,265000,'apu',0),('filter','SS-FLT-208','Oil filter element','Expendable','s3',21,280,'seal',0),('brake','SS-BRK-320','Wheel brake assembly','Landing gear','s6',68,34500,'disk',0),('tire','SS-TIR-738','Main-wheel tire','Consumable','s3',24,2200,'disk',0),('actuator','SS-ACT-017','Flight-control actuator','Rotable','s6',95,42600,'pump',0),('battery','SS-BAT-024','Aircraft battery','Electrical','s2',30,7100,'generator',0)]
suppliers=[{'id':k,'name':n,'location':loc,'specialty':sp}for k,n,loc,sp in [('s1','Aster Aero Manufacturing','Wichita, KS','Castings and hot-section components'),('s2','Northline Component Services','Dallas, TX','Bearings and electrical components'),('s3','Desert Aero Distribution','Phoenix, AZ','Standard hardware and consumables'),('s4','Summit Precision Forge','Cleveland, OH','Forgings and machined hardware'),('s5','Vector APU Services','Tulsa, OK','APU and rotable repair pools'),('s6','Atlantic Aero Systems','Miami, FL','Pneumatics, actuators and landing gear')]]
cat=[dict(zip(['id','code','name','category','supplier','lead','price','art','quarterly'],p)) for p in parts]
history=[]
for part in cat:
 for i in range(20):
  material=r.random()>.28;tooling=r.random()>.16;util=r.randint(61,98);yieldpct=r.randint(88,99)
  delay=(0 if material else 22)+(0 if tooling else 12)+max(0,util-80)*.55+(10 if yieldpct<94 else 0)
  actual=max(3,round(part['lead']+delay+r.randint(-9,9)));promise=part['lead']+r.randint(-3,12)
  ordered=base-timedelta(days=part['lead']+90+(19-i)*18)
  qty=r.choice([10,20,50,100]) if part['id'] not in ['apu','brake','actuator'] else r.choice([1,2,3])
  history.append({'id':f'PO-H-{part["id"].upper()}-{i+1:03}','partId':part['id'],'supplier':part['supplier'],'ordered':ordered.isoformat(),'requested':add(ordered,promise-4),'promised':add(ordered,promise),'received':add(ordered,actual),'qty':qty,'unitPrice':part['price'],'material':material,'tooling':tooling,'utilization':util,'yield':yieldpct,'actualLead':actual,'promisedLead':promise,'split':'Train' if i<15 else 'Holdout','featureCaptured':ordered.isoformat()})
inv=[];orders=[]
for org in ['OEM','Airline']:
 for j,part in enumerate(cat):
  total=(round(part['quarterly']*.18) if org=='OEM' and part['quarterly'] else r.randint(2,8))
  if org=='Airline':total={'apu':2,'starter':2,'fuel':1,'filter':18,'brake':3,'tire':8,'actuator':1,'igniter':3,'seal':12}.get(part['id'],r.randint(2,5))
  held=1 if part['id'] in ['apu','fuel','forging'] else 0;reserved=0 if total<3 else (1 if org=='Airline' else int(total*.08))
  if org=='OEM' and part['id'] in ['housing','bearing','bolt','liner']:
   total={'housing':50,'bearing':220,'bolt':1800,'liner':80}[part['id']];held=reserved=0
  inv.append({'id':f'INV-{org.upper()}-{j+1:03}','org':org,'partId':part['id'],'onHand':total,'reserved':reserved,'held':held,'warehouse':'PHX-PROD' if org=='OEM' else 'PHX-MRO','lot':f'DEMO-LOT-{j+101}','updated':add(base,-4 if j==3 else 0),'trace':'Sample trace pack only'})
  qty=(round(part['quarterly']*{'shaft':1.05,'seal':.95,'fuel':.65,'starter':.9,'igniter':1.0,'valve':.75,'sensor':.95}.get(part['id'],.7)) if org=='OEM' and part['quarterly'] else r.randint(1,4))
  if org=='OEM' and part['id'] in ['housing','bearing','bolt','liner']:qty={'housing':700,'bearing':1680,'bolt':10500,'liner':800}[part['id']]
  ordered=base-timedelta(days=max(1,part['lead']-22));promised=add(base,18+j%4*7)
  if org=='OEM' and part['id'] in ['housing','bearing','bolt','liner']:promised={'housing':'2027-02-05','bearing':'2027-01-31','bolt':'2027-01-26','liner':'2027-02-08'}[part['id']]
  orders.append({'id':f'PO-{org.upper()}-{450101+j}','org':org,'partId':part['id'],'supplier':part['supplier'],'scheduleLine':'0010','qty':qty,'receivedQty':0,'ordered':ordered.isoformat(),'requested':add(base,14+j%3*7),'promised':promised,'material':part['id'] not in ['housing','forging','liner'],'tooling':part['id'] not in ['forging','actuator'],'utilization':96 if part['id'] in ['housing','bearing','forging'] else r.randint(70,92),'yield':91 if part['id'] in ['housing','liner'] else r.randint(95,99),'updated':add(base,-5 if j==3 else 0),'status':'Acknowledged','currency':'USD'})
fleet=[{'id':f'DEMO-AC-{i+1:02}','type':'B737-800' if i%2==0 else 'A320-200','base':['PHX','DFW','DEN','MIA'][i%4],'hours':18000+i*1200,'cycles':9000+i*600,'hoursPerDay':7.5+i%4*.6,'cyclesPerDay':3+i%3*.4}for i in range(16)]
installed=[]
for i,ac in enumerate(fleet):
 for k,pid in enumerate(['apu','starter','filter']):
  # Invented planning targets, never manufacturer or regulatory life limits.
  limitHours=[6000,4000,700][k];limitCycles=[4000,2500,500][k];lifeDays=[1095,730,180][k];elapsed=[810+i*8,520+i*5,90+i*3][k]
  installed.append({'id':f'COMP-{i+1:02}-{k+1}','aircraft':ac['id'],'partId':pid,'serial':f'DEMO-SN-{i+1:03}{k}','installed':add(base,-elapsed),'purchase':add(base,-elapsed-14),'calendarDays':lifeDays,'limitHours':limitHours,'limitCycles':limitCycles,'usedHours':round(limitHours*.55+i*3),'usedCycles':round(limitCycles*.45+i*2),'hoursPerDay':[2.8,4,2.5][k],'cyclesPerDay':[3,3,3.5][k],'buffer':21,'condition':'Monitor' if i in [2,7,12] else 'Routine','planningOnly':True})
jobs=[]
for i in range(36):
 pid=['apu','starter','filter','fuel','brake','tire','igniter','seal','actuator'][i%9];ac=fleet[i%16]
 jobs.append({'id':f'WO-DEMO-{27001+i}','org':'Airline','aircraft':ac['id'],'type':ac['type'],'base':ac['base'],'partId':pid,'qty':1 if pid not in ['filter','seal','tire'] else 2,'due':add(base,7+(i//9)*14+(i%9)*2),'owner':['Alex Chen','Morgan Reed','Taylor Brooks'][i%3],'priority':'AOG planning' if i==0 else 'Scheduled','task':'Planned APU removal' if pid=='apu' else 'Scheduled component replacement','status':'Planned'})
# First two APU removals precede inbound receipts; these anchor the airline story.
jobs[0]['due']='2026-11-27';jobs[9]['due']='2026-12-04'
data={'manifest':{'schema':'skysupply-synthetic-erp-1','snapshot':'2026-11-20','seed':13192026,'synthetic':True,'note':'All values generated for demonstration. Public references inform categories/record structure, not these quantities or prices.'},'catalog':cat,'suppliers':suppliers,'history':history,'inventory':inv,'orders':orders,'fleet':fleet,'installed':installed,'jobs':jobs}
root=Path(__file__).resolve().parents[1];(root/'erp-data.js').write_text('/* Entirely synthetic aerospace ERP demonstration dataset. */\nconst ERP_DATA = '+json.dumps(data,separators=(',',':'))+';\n')
(root/'assets'/'synthetic-erp.json').write_text(json.dumps(data,indent=2))
print({k:len(v) for k,v in data.items() if isinstance(v,list)})
