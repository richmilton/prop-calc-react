(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t){e.exports={commercial:[{upto:15e4,rate:0},{upto:25e4,rate:2},{upto:"end",rate:5}],residential:[{upto:125e3,rate:0,load:3},{upto:25e4,rate:2,load:3},{upto:925e3,rate:5,load:3},{upto:15e5,rate:10,load:3},{upto:"end",rate:12,load:3}],ireland:[{upto:1e6,rate:1},{upto:"end",rate:2}],residentialWales:[{upto:18e4,rate:0,load:3},{upto:25e4,rate:3.5,load:3},{upto:4e5,rate:5,load:3},{upto:75e4,rate:7.5,load:3},{upto:15e5,rate:10,load:3},{upto:"end",rate:12,load:3}],commercialWales:[{upto:15e4,rate:0},{upto:25e4,rate:1},{upto:1e6,rate:5},{upto:"end",rate:6}],residentialScotland:[{upto:145e3,rate:0,load:3},{upto:25e4,rate:2,load:3},{upto:325e3,rate:5,load:3},{upto:75e4,rate:10,load:3},{upto:"end",rate:12,load:3}],commercialScotland:[{upto:15e4,rate:0},{upto:25e4,rate:1},{upto:"end",rate:5}]}},14:function(e,t,a){e.exports=a(22)},2:function(e,t){var a=String.fromCharCode(37),n={NUMBER:"number",TEXT:"text",CHECKBOX:"checkbox",SELECT:"select"},l=[{label:"Project name",name:"projectName",type:n.TEXT,defVal:"",required:!0},{label:"Post code",name:"postCode",type:n.TEXT,defVal:"",required:!0},{label:"Asking price(".concat("##CURR##",")"),name:"askingPrice",type:n.NUMBER,defVal:0},{label:"Purchase price(".concat("##CURR##",")"),name:"propertyValue",type:n.NUMBER,defVal:0},{label:"Done up value(".concat("##CURR##",")"),name:"doneUpValue",type:n.NUMBER,defVal:0},{label:"Monthly rent(".concat("##CURR##",")"),name:"monthlyRent",type:n.NUMBER,defVal:0},{label:"Cash purchase",name:"buyingCash",type:n.CHECKBOX,defVal:"no"},{label:"Initial LTV(".concat(a,")"),name:"initialLoanToValue",type:n.NUMBER,defVal:75},{label:"Surveyors fee(".concat("##CURR##",")"),name:"initSurveyorsFee",type:n.NUMBER,defVal:600},{label:"Mortgage fee(".concat("##CURR##",")"),name:"initMortgageFee",type:n.NUMBER,defVal:0},{label:"Legal fees(".concat("##CURR##",")"),name:"initLegalFee",type:n.NUMBER,defVal:1500},{label:"Stamp duty",name:"stampDutyType",type:n.SELECT,options:[{value:"residential",name:"Residential Eng/NI"},{value:"commercial",name:"Commercial Eng/NI"},{value:"residentialWales",name:"Residential Wales"},{value:"commercialWales",name:"Commercial Wales"},{value:"residentialScotland",name:"Residential Scotland"},{value:"commercialScotland",name:"Commercial Scotland"},{value:"ireland",name:"Ireland"}],defVal:"residential"},{label:"Refurbishment cost(".concat("##CURR##",")"),name:"refurbCost",type:n.NUMBER,defVal:0},{label:"Other cost(".concat("##CURR##",")"),name:"otherCost",type:n.NUMBER,defVal:0},{label:"Remortgage fee(".concat("##CURR##",")"),name:"remortgageFee",type:n.NUMBER,defVal:0},{label:"Remortgage valuation fee(".concat("##CURR##",")"),name:"remortgageValuationFee",type:n.NUMBER,defVal:0},{label:"Remortgage legal fees(".concat("##CURR##",")"),name:"remortgageLegalFee",type:n.NUMBER,defVal:0},{label:"Letting agents rate(".concat(a,")"),name:"agentsPercent",type:n.NUMBER,defVal:10},{label:"\n    MOE rate(".concat(a,")"),name:"moePercent",type:n.NUMBER,defVal:15},{label:"Repairing lease",name:"repairingLease",type:n.CHECKBOX,defVal:"no"},{label:"Interest rate(".concat(a,")"),name:"mortgageInterestRatePercent",type:n.NUMBER,defVal:6},{label:"Remortgage LTV(".concat(a,")"),name:"loanToValue",type:n.NUMBER,defVal:75},{label:"Solicitors selling fee(".concat("##CURR##",")"),name:"sellingLegalFee",type:n.NUMBER,defVal:0},{label:"Agent/selling fee(".concat("##CURR##",")"),name:"agentSellingFee",type:n.NUMBER,defVal:0},{label:"Mortgage stress test(".concat(a,")"),name:"mortgageStressMultipePercent",type:n.NUMBER,defVal:125},{label:"Stress interest rate(".concat(a,")"),name:"mortgageStressInterestRatePercent",type:n.NUMBER,defVal:5}];e.exports={fields:l,currencyPlaceholder:"##CURR##",types:n}},20:function(e,t,a){},21:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(11),o=a.n(r),c=a(3),i=a(4),s=a(6),u=a(8),d=a(7),m=a(5),p=a(9),f=a(1),b=a(2),h=new RegExp(b.currencyPlaceholder,"g"),v=function(e,t){var a=String.fromCharCode(t);return e.replace(h,a)};function y(e){var t=e.name,a=e.doLabelClass,n=e.dynamicLabel,r=e.label,o=e.type,c=e.currency,i=v(r,c);return l.a.createElement("div",{className:"checkbox"===o?"checkbox-label":"input-label"},l.a.createElement("label",{htmlFor:t,className:a(t)},n(t,i)))}var g={Input:function(e){var t=e.className,a=e.name,n=e.type,r=e.onInput,o=e.placeholder,c=e.label,i=e.defVal,s=e.onblur,u=e.doLabelClass,d=e.dynamicLabel,m=e.currency,p=e.required,f=v(c,m);return l.a.createElement("li",{key:a},l.a.createElement("input",{className:t||"form-control",key:a,type:n,name:a,id:a,onChange:function(e){return r(e)},autoComplete:"off",placeholder:o||f||"".concat(a," [").concat(n,"]"),defaultValue:i||"",defaultChecked:"yes"===i,onBlur:function(e){return s(e)},required:p||!1}),y({name:a,doLabelClass:u,dynamicLabel:d,label:c,type:n,currency:m}))},Select:function(e){var t=e.className,a=e.name,n=e.type,r=e.onInput,o=e.label,c=e.defVal,i=e.onblur,s=e.options,u=e.doLabelClass,d=e.dynamicLabel;return l.a.createElement("li",{key:a},l.a.createElement("select",{value:c,className:t||"form-control",key:a,name:a,id:a,onChange:function(e){return r(e)},onBlur:function(e){return i(e)}},s.map(function(e){return l.a.createElement("option",{key:e.value,name:e.name,value:e.value},e.name)})),y({name:a,doLabelClass:u,dynamicLabel:d,label:o,type:n}))}},E=g.Input,S=g.Select;function C(e){var t=e.render,a=e.fields,n=e.className;return l.a.createElement("ul",{className:n},t(a))}var R=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={fields:e.fields,formData:e.formData},a.doLabel=a.doLabel.bind(Object(f.a)(Object(f.a)(a))),a.doLabelClass=a.doLabelClass.bind(Object(f.a)(Object(f.a)(a))),a.renderFields=a.renderFields.bind(Object(f.a)(Object(f.a)(a))),a.renderFieldCols=a.renderFieldCols.bind(Object(f.a)(Object(f.a)(a))),a.handleChange=a.handleChange.bind(Object(f.a)(Object(f.a)(a))),a.handleSave=a.handleSave.bind(Object(f.a)(Object(f.a)(a))),a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.calculate()}},{key:"doLabel",value:function(e,t){var a=this.state.formData;return a&&a[e]?t||e:""}},{key:"doLabelClass",value:function(e){var t=this.state.formData;return t&&t[e]?"show":"hide"}},{key:"handleChange",value:function(e){var t,a=e.type,n=e.value,l=e.checked,r=e.name,o=this.props,s=this.state.formData;switch(a){case b.types.NUMBER:t=Number.isNaN(n)?0:parseFloat(n)||0;break;case b.types.CHECKBOX:t=l?"yes":"no";break;default:t=n||""}o.calculate(r,t),this.setState({formData:Object(i.a)({},s,Object(c.a)({},r,t))})}},{key:"handleSave",value:function(e){e.preventDefault();var t=this.state;(0,this.props.onsave)(t.formData),e.target.blur()}},{key:"renderFields",value:function(e){var t=this,a=[],n=this.props,l=n.currsymbol,r=n.formData;return e.forEach(function(e){var n=Object(i.a)({},e);n.dynamicLabel=function(e,a){return t.doLabel(e,a)},n.doLabelClass=function(e){return t.doLabelClass(e)},n.onInput=function(e){return t.handleChange(e.target)},n.onblur=function(e){return t.handleChange(e.target)},n.currency=l,n.defVal=r[n.name],"select"===n.type?a.push(S(n)):a.push(E(n))}),a}},{key:"renderFieldCols",value:function(){var e=this.state,t=Math.floor(e.fields.length/2),a=e.fields.slice(0),n=a.splice(t);return[l.a.createElement(C,{key:"1",fields:a,className:"left",render:this.renderFields}),l.a.createElement(C,{key:"2",fields:n,className:"right",render:this.renderFields})]}},{key:"render",value:function(){var e=this.props,t=e.name,a=e.twocols,n=e.fields,r=e.showsave?l.a.createElement("ul",{className:"left"},l.a.createElement("li",null,l.a.createElement("button",{type:"submit",className:"btn-primary form-control",onClick:this.handleSave},"save this"))):"";return l.a.createElement("form",{name:t,id:t},"yes"===a?this.renderFieldCols():this.renderFields(n),r)}}]),t}(n.Component),N=(a(20),function(e){var t=e.label,a=e.value;return l.a.createElement("li",null,l.a.createElement("div",{className:"label"},t),l.a.createElement("div",{className:"value"},a))}),F=function(e){var t=e.data,a=e.id;return l.a.createElement("ul",null,t.map(function(e,t){var n=e.label,r=e.value,o="li-".concat(a,"-").concat(t);return l.a.createElement(N,{key:"li-".concat(o),label:n,value:r})}))},L=a(12),M=a.n(L),k=function(e,t){e.preventDefault(),t(e.target.id.split("-")[1])},D=function(e){var t,a=e.label,n=e.value,r=e.ondelete;return l.a.createElement("li",null,l.a.createElement("div",{className:"state"},l.a.createElement("button",{className:"btn-primary form-control",style:{width:"100%"},type:"submit",id:"select-".concat(n),onClick:function(e){return k(e,function(e){window.location.href="/".concat(e)})}},"".concat(a," (").concat((t=n,M()("dd/MM hh:mm:ss",new Date(parseInt(t,0)))),")"))),l.a.createElement("div",{className:"remove-state"},l.a.createElement("button",{className:"btn-sm btn-primary btn-warning",type:"submit",id:"delete-".concat(n),onClick:function(e){return k(e,r)}},"delete")))},O=function(e){var t=e.data,a=e.ondelete,n=e.onselect;return t.map?l.a.createElement("ul",null,t.map(function(e,t){var r=e.projectName,o=e.id,c="li-".concat(o,"-").concat(t);return l.a.createElement(D,{ondelete:a,key:"li-".concat(c),label:r||"untitled",value:o,onselect:n})})):""},V=a(13),j=a.n(V),B=function(e,t){var a,n,l,r=e/100,o=j.a[t],c=0;if(!t)return 0;for(var i=0;i<o.length;i+=1){l=o[i].load||0,a=o[i].upto;var s=o[i].rate;if(n=i>0?o[i-1].upto:0,"end"===a)return c+=(r-n/100)*(s+l);if(e<=a)return c+=0===i?r*(s+l):(r-n/100)*(s+l);c+=(a-n)/100*(s+l)}return c},U=function(e,t,a,n,l,r,o){return e+t+a+n+l+B(r,o)+r},w=["Remortgage advance","Remortgage deposit","Remortgage fees","Money in","Money out","Money left in","Monthly rental","Monthly mortgage payment","MOE","Letting agent fees","Monthly free cashflow"],T=["Mortgage advance","Deposit","Stamp duty","Professional fees","Refurb/other costs","Total money in","Total cost"],P=["Sale price","Selling costs","Total input costs","Profit (before tax)","Gain(%)"],x=["Stress test","Minimum rent"],I={freeCash:function(e){var t=e.loanToValue,a=e.propertyValue,n=e.doneUpValue,l=e.mortgageInterestRatePercent,r=e.monthlyRent,o=e.moePercent,c=e.agentsPercent,i=e.refurbCost,s=e.otherCost,u=e.stampDutyType,d=e.remortgageFee,m=e.remortgageValuationFee,p=e.remortgageLegalFee,f=e.initMortgageFee,b=e.initLegalFee,h=e.initSurveyorsFee,v=e.repairingLease,y=t/100,g=Math.round(n*y),E=Math.round(n*(1-y)),S=Math.round(g*l/1200),C="yes"===v?0:r*o/100,R=r*c/100,N=r-("yes"===v?0:C)-S-R,F=d+m+p,L=f+b+h+(i+s)+B(a,u)+a,M=w;return[{label:M[0],value:g.toFixed(2)},{label:M[1],value:E.toFixed(2)},{label:M[2],value:F.toFixed(2)},{label:M[3],value:L.toFixed(2)},{label:M[4],value:(g-F).toFixed(2)},{label:M[5],value:(L-(g-F)).toFixed(2)},{label:M[6],value:r.toFixed(2)},{label:M[7],value:S.toFixed(2)},{label:M[8],value:C.toFixed(2)},{label:M[9],value:R.toFixed(2)},{label:M[10],value:N.toFixed(2)}]},initialFinance:function(e){var t=e.buyingCash,a=e.initialLoanToValue,n=e.propertyValue,l=e.initSurveyorsFee,r=e.initLegalFee,o=e.initMortgageFee,c=e.refurbCost,i=e.otherCost,s=e.stampDutyType,u="yes"===t,d=a/100,m=u?0:Math.round(n*d),p=l+r+o,f=c+i,b=u?n:Math.round(n*(1-d)),h=B(n,s),v=U(l,r,o,c,i,n,s),y=v-m,g=T;return[{label:g[0],value:m.toFixed(2)},{label:g[1],value:b.toFixed(2)},{label:g[2],value:h.toFixed(2)},{label:g[3],value:p.toFixed(2)},{label:g[4],value:f.toFixed(2)},{label:g[5],value:y.toFixed(2)},{label:g[6],value:v.toFixed(2)}]},flip:function(e){var t=e.sellingLegalFee,a=e.agentSellingFee,n=e.initSurveyorsFee,l=e.initLegalFee,r=e.initMortgageFee,o=e.refurbCost,c=e.otherCost,i=e.propertyValue,s=e.stampDutyType,u=e.doneUpValue,d=U(n,l,r,o,c,i,s),m=t+a,p=Math.round((u-d)/d*1e4)/100,f=p>=20?"green":"red",b=P;return[{label:b[0],value:u.toFixed(2)},{label:b[1],value:m.toFixed(2)},{label:b[2],value:d.toFixed(2)||"0"},{label:b[3],value:(u-(d+m)).toFixed(2)||"0",col:f},{label:b[4],value:p.toFixed(2)||0,col:f}]},allInputCosts:U,stressTest:function(e){var t=e.doneUpValue,a=e.monthlyRent,n=e.loanToValue,l=e.mortgageStressInterestRatePercent,r=e.mortgageStressMultipePercent,o=Math.ceil(t*n/100*l/1200*r/100),c=a>=o,i=x;return[{label:i[0],value:c?"pass":"fail"},{label:i[1],value:o.toFixed(2)}]},getCurrencyCode:function(e){return"ireland"===e.stampDutyType?8364:163}},A=/^(GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4})$/,W=function(e){return A.test(e.toUpperCase())},H=/localhost|192.168.0.12/.test(window.location.hostname),G="https://localhost/comparisons",K="https://www.rightmove.co.uk/property-for-sale/search.html?radius=0.25&includeSSTC=true&searchLocation=",X="https://www.rightmove.co.uk/property-to-rent/search.html?radius=0.25&&includeLetAgreed=true&searchLocation=",J="https://nethouseprices.com/house-prices/",Y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={data:{dealFinance:[],buyToLet:[],stress:[],flip:[]},fields:b.fields,currency:163,savedStates:{Items:[]},currentState:null,hasWorkingAPI:!1},a.doResults=a.doResults.bind(Object(f.a)(Object(f.a)(a))),a.calculate=a.calculate.bind(Object(f.a)(Object(f.a)(a))),a.setDefaultFormData=a.setDefaultFormData.bind(Object(f.a)(Object(f.a)(a))),a.saveState=a.saveState.bind(Object(f.a)(Object(f.a)(a))),a.deleteState=a.deleteState.bind(Object(f.a)(Object(f.a)(a))),a}return Object(p.a)(t,e),Object(m.a)(t,null,[{key:"findState",value:function(e,t){return e.Items.find(function(e){return e.id===t})}}]),Object(m.a)(t,[{key:"componentDidMount",value:function(){H?this.getSavedStates():this.loadDefault()}},{key:"getSavedStates",value:function(e){var a=this;if(G&&""!==G){var n=window.location.pathname.substr(1)||"";fetch(G).then(function(e){return e.json()}).then(function(l){if(e||""!==n){var r=t.findState(l,n||e);r?e&&n!==e?window.location="/".concat(e):a.setState({savedStates:l,hasWorkingAPI:!0,currentState:r||a.setDefaultFormData()}):window.location="/"}else a.setState({savedStates:l,hasWorkingAPI:!0,currentState:a.setDefaultFormData()})}).catch(function(){""!==n?window.location="/":a.loadDefault(!1)})}else this.loadDefault()}},{key:"setDefaultFormData",value:function(){var e={};return this.state.fields.map(function(t){return e[t.name]=t.defVal,!1}),e}},{key:"loadDefault",value:function(){this.setState({savedStates:{Items:[]},currentState:this.setDefaultFormData(),hasWorkingAPI:!1})}},{key:"calculate",value:function(e,t){var a=this.state.currentState,n=e?Object(i.a)({},a,Object(c.a)({},e,t)):a,l=I.initialFinance(n),r=I.freeCash(n),o=I.flip(n),s=I.stressTest(n),u=I.getCurrencyCode(n);document.getElementById("doc-title").text=n.projectName.replace(/ /g,"-"),this.setState({data:{dealFinance:l,buyToLet:r,stress:s,flip:o},currency:u,currentState:n})}},{key:"doResults",value:function(){var e=this.state,t=e.data,a=e.currentState,n=a.postCode,r=a.askingPrice,o=a.monthlyRent,c=a.propertyValue,i=t.dealFinance,s=t.buyToLet,u=t.stress,d=t.flip,m=1e3,p=1e5,f=Math.ceil((r||c||4e5)/p*1.2)*p,b=Math.ceil((o||m)/m*1.2)*m,h=n&&W(n)?l.a.createElement(l.a.Fragment,null,l.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:J+n},"sold data")," | ",l.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"".concat(K+n,"&maxPrice=").concat(f)},"for sale")," | ",l.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"".concat(X+n,"&maxPrice=").concat(b)},"to rent")):l.a.createElement("span",{style:{color:"red",fontStyle:"italic"}},"use a full valid post code to see links here");return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Links for this post code"),h),l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Deal finance"),l.a.createElement(F,{id:"1",data:i})),l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Buy to let"),l.a.createElement(F,{id:"2",data:s})),l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Stress test"),l.a.createElement(F,{id:"3",data:u})),l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Flip"),l.a.createElement(F,{id:"4",data:d})))}},{key:"saveState",value:function(){var e=this,t=this.state.currentState,a=t.projectName,n=t.postCode;""!==a&&""!==n&&fetch(G,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(t){var a=t.id;e.getSavedStates(a)}).catch(function(){return e.setState({savedStates:{Items:"No save service avaialable"}})}).finally(function(){e.setState({error:null})})}},{key:"deleteState",value:function(e){var t=this;fetch(G,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:e})}).then(function(e){if(!e.ok)throw new Error("delete failed");t.getSavedStates()}).catch(function(){return t.setState({savedStates:{Items:"No delete service avaialable"}})})}},{key:"render",value:function(){var e=this.state,t=e.currency,a=e.savedStates,n=e.currentState,r=e.hasWorkingAPI,o=e.error,c=a.Items,i=l.a.createElement(O,{data:c,ondelete:this.deleteState}),s=c?i:"",u="/"!==window.location.pathname?l.a.createElement("ul",{className:"right"},l.a.createElement("li",null,l.a.createElement("button",{type:"submit",className:"btn-primary form-control",onClick:function(){window.location.href="/"}},"new"))):"";return n?l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"column",style:{textAlign:"center"}},l.a.createElement("h5",null,"Property investment deal analyser"),l.a.createElement(R,{name:"propcalc",fields:b.fields,formData:n,twocols:"yes",calculate:this.calculate,currsymbol:t,onsave:this.saveState,showsave:r,error:o}),u),l.a.createElement("div",{className:"column results"},this.doResults()),l.a.createElement("div",{className:"column states"},s)):""}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(21);o.a.render(l.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.1a0fec56.chunk.js.map