(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t){var a=[{upto:1e6,rate:1},{upto:"end",rate:2}],n=[{upto:25e4,rate:2,load:3},{upto:325e3,rate:5,load:3},{upto:75e4,rate:10,load:3},{upto:"end",rate:12,load:3}],l={commercial:{england:[{upto:15e4,rate:0},{upto:25e4,rate:2},{upto:"end",rate:5}],wales:[{upto:15e4,rate:0},{upto:25e4,rate:1},{upto:1e6,rate:5},{upto:"end",rate:6}],scotland:[{upto:15e4,rate:0},{upto:25e4,rate:1},{upto:"end",rate:5}],ireland:a},residential:{first:{england:{thresholds:[{upto:3e5,rate:0},{upto:5e5,rate:5}],limit:5e5},scotland:{thresholds:[{upto:175e3,rate:0}].concat(n),limit:-1}},england:[{upto:125e3,rate:0,load:3},{upto:25e4,rate:2,load:3},{upto:925e3,rate:5,load:3},{upto:15e5,rate:10,load:3},{upto:"end",rate:12,load:3}],wales:[{upto:18e4,rate:0,load:3},{upto:25e4,rate:3.5,load:3},{upto:4e5,rate:5,load:3},{upto:75e4,rate:7.5,load:3},{upto:15e5,rate:10,load:3},{upto:"end",rate:12,load:3}],scotland:[{upto:145e3,rate:0,load:3}].concat(n),ireland:a}};e.exports=l},14:function(e,t,a){e.exports=a(22)},2:function(e,t){var a=String.fromCharCode(37),n={NUMBER:"number",TEXT:"text",CHECKBOX:"checkbox",SELECT:"select"},l=[{label:"Project name",name:"projectName",type:n.TEXT,defVal:"",required:!0},{label:"Post code",name:"postCode",type:n.TEXT,defVal:"",required:!0},{label:"Asking price(".concat("##CURR##",")"),name:"askingPrice",type:n.NUMBER,defVal:0},{label:"Purchase price(".concat("##CURR##",")"),name:"propertyValue",type:n.NUMBER,defVal:0},{label:"Done up value(".concat("##CURR##",")"),name:"doneUpValue",type:n.NUMBER,defVal:0},{label:"Cash purchase",name:"buyingCash",type:n.CHECKBOX,defVal:"no"},{label:"Initial LTV(".concat(a,")"),name:"initialLoanToValue",type:n.NUMBER,defVal:75,disabled:{whenField:"buyingCash",isEqual:"yes",defVal:"0"}},{label:"Mortgage fee(".concat("##CURR##",")"),name:"initMortgageFee",type:n.NUMBER,defVal:0,disabled:{whenField:"buyingCash",isEqual:"yes",defVal:"0"}},{label:"Surveyors fee(".concat("##CURR##",")"),name:"initSurveyorsFee",type:n.NUMBER,defVal:600},{label:"Legal fees(".concat("##CURR##",")"),name:"initLegalFee",type:n.NUMBER,defVal:1500},{label:"Stamp duty type",name:"stampDutyType",type:n.SELECT,options:[{value:"residential",name:"Residential"},{value:"commercial",name:"Commercial"}],defVal:"residential"},{label:"Stamp duty region",name:"stampDutyRegion",type:n.SELECT,options:[{value:"england",name:"England/NI"},{value:"scotland",name:"Scotland"},{value:"wales",name:"Wales"},{value:"ireland",name:"Ireland"}],defVal:"england"},{label:"Stamp duty buyer",name:"stampDutyBuyer",type:n.SELECT,options:[{value:"investor",name:"Investor"},{value:"first",name:"First time buyer"},{value:"home",name:"Moving house"}],defVal:"investor",disabled:{whenField:"stampDutyType",isEqual:"commercial"}},{label:"Monthly rent(".concat("##CURR##",")"),name:"monthlyRent",type:n.NUMBER,defVal:0},{label:"Refurbishment cost(".concat("##CURR##",")"),name:"refurbCost",type:n.NUMBER,defVal:0},{label:"Other cost(".concat("##CURR##",")"),name:"otherCost",type:n.NUMBER,defVal:0},{label:"Remortgage fee(".concat("##CURR##",")"),name:"remortgageFee",type:n.NUMBER,defVal:0},{label:"Remortgage valuation fee(".concat("##CURR##",")"),name:"remortgageValuationFee",type:n.NUMBER,defVal:0},{label:"Remortgage legal fees(".concat("##CURR##",")"),name:"remortgageLegalFee",type:n.NUMBER,defVal:0},{label:"Repairing lease",name:"repairingLease",type:n.CHECKBOX,defVal:"no"},{label:"Letting agents rate(".concat(a,")"),name:"agentsPercent",type:n.NUMBER,defVal:10,disabled:{whenField:"repairingLease",isEqual:"yes",defVal:"0"}},{label:"\n    MOE rate(".concat(a,")"),name:"moePercent",type:n.NUMBER,defVal:15,disabled:{whenField:"repairingLease",isEqual:"yes",defVal:"0"}},{label:"Interest rate(".concat(a,")"),name:"mortgageInterestRatePercent",type:n.NUMBER,defVal:6},{label:"Remortgage LTV(".concat(a,")"),name:"loanToValue",type:n.NUMBER,defVal:75},{label:"Solicitors selling fee(".concat("##CURR##",")"),name:"sellingLegalFee",type:n.NUMBER,defVal:0},{label:"Agent/selling fee(".concat("##CURR##",")"),name:"agentSellingFee",type:n.NUMBER,defVal:0},{label:"Mortgage stress test(".concat(a,")"),name:"mortgageStressMultipePercent",type:n.NUMBER,defVal:125},{label:"Stress interest rate(".concat(a,")"),name:"mortgageStressInterestRatePercent",type:n.NUMBER,defVal:5}];e.exports={fields:l,currencyPlaceholder:"##CURR##",types:n}},20:function(e,t,a){},21:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(12),o=a.n(r),c=a(4),i=a(5),s=a(6),u=a(8),d=a(7),m=a(3),p=a(9),f=a(1),h=a(2),b=new RegExp(h.currencyPlaceholder,"g"),y=function(e,t){var a=String.fromCharCode(t);return e.replace(b,a)};function v(e){var t=e.name,a=e.doLabelClass,n=e.dynamicLabel,r=e.label,o=e.type,c=e.currency,i=y(r,c);return l.a.createElement("div",{className:"checkbox"===o?"checkbox-label":"input-label"},l.a.createElement("label",{htmlFor:t,className:a(t)},n(t,i)))}var g={Input:function(e){var t=e.className,a=e.name,n=e.type,r=e.onInput,o=e.placeholder,c=e.label,i=e.defVal,s=e.onblur,u=e.doLabelClass,d=e.dynamicLabel,m=e.currency,p=e.required,f=e.disabled,h=y(c,m);return l.a.createElement("li",{key:a},l.a.createElement("input",{className:t||"form-control",key:a,type:n,name:a,id:a,onChange:function(e){return r(e)},autoComplete:"off",placeholder:o||h||"".concat(a," [").concat(n,"]"),value:i||"",checked:"yes"===i,onBlur:function(e){return s(e)},required:p||!1,disabled:f}),v({name:a,doLabelClass:u,dynamicLabel:d,label:c,type:n,currency:m}))},Select:function(e){var t=e.className,a=e.name,n=e.type,r=e.onInput,o=e.label,c=e.defVal,i=e.onblur,s=e.options,u=e.doLabelClass,d=e.dynamicLabel,m=e.disabled;return l.a.createElement("li",{key:a},l.a.createElement("select",{value:c,className:t||"form-control",key:a,name:a,id:a,onChange:function(e){return r(e)},onBlur:function(e){return i(e)},disabled:m},s.map(function(e){return l.a.createElement("option",{key:e.value,name:e.name,value:e.value},e.name)})),v({name:a,doLabelClass:u,dynamicLabel:d,label:o,type:n}))}},E=g.Input,S=g.Select;function C(e){var t=e.render,a=e.fields,n=e.className;return l.a.createElement("ul",{className:n},t(a))}var R=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).doLabel=a.doLabel.bind(Object(f.a)(Object(f.a)(a))),a.doLabelClass=a.doLabelClass.bind(Object(f.a)(Object(f.a)(a))),a.renderFields=a.renderFields.bind(Object(f.a)(Object(f.a)(a))),a.renderFieldCols=a.renderFieldCols.bind(Object(f.a)(Object(f.a)(a))),a.handleChange=a.handleChange.bind(Object(f.a)(Object(f.a)(a))),a.handleSave=a.handleSave.bind(Object(f.a)(Object(f.a)(a))),a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.calculate()}},{key:"doLabel",value:function(e,t){var a=this.props.formData;return a&&a[e]?t||e:""}},{key:"doLabelClass",value:function(e){var t=this.props.formData;return t&&t[e]?"show":"hide"}},{key:"handleChange",value:function(e){var t,a=e.type,n=e.value,l=e.checked,r=e.name,o=this.props;switch(a){case h.types.NUMBER:t=Number.isNaN(n)?0:parseFloat(n)||0;break;case h.types.CHECKBOX:t=l?"yes":"no";break;default:t=n||""}o.calculate(r,t)}},{key:"handleSave",value:function(e){e.preventDefault(),(0,this.props.onsave)(),e.target.blur()}},{key:"renderFields",value:function(e){var t=this,a=[],n=this.props,l=n.currsymbol,r=n.formData;return e.forEach(function(e){var n=Object(i.a)({},e),o=n.disabled&&r[n.disabled.whenField]===n.disabled.isEqual;n.dynamicLabel=function(e,a){return t.doLabel(e,a)},n.doLabelClass=function(e){return t.doLabelClass(e)},n.onInput=function(e){return t.handleChange(e.target)},n.onblur=function(e){return t.handleChange(e.target)},n.currency=l,n.defVal=o?n.disabled.defVal||n.defVal:r[n.name],n.disabled=o,"select"===n.type?a.push(S(n)):a.push(E(n))}),a}},{key:"renderFieldCols",value:function(){var e=this.props.fields,t=Math.floor(e.length/2),a=e.slice(0),n=a.splice(t);return[l.a.createElement(C,{key:"1",fields:a,className:"left",render:this.renderFields}),l.a.createElement(C,{key:"2",fields:n,className:"right",render:this.renderFields})]}},{key:"render",value:function(){var e=this.props,t=e.name,a=e.twocols,n=e.fields,r=e.showsave?l.a.createElement("ul",{className:"left"},l.a.createElement("li",null,l.a.createElement("button",{type:"submit",className:"btn-primary form-control",onClick:this.handleSave},"save this"))):"";return l.a.createElement("form",{name:t,id:t},"yes"===a?this.renderFieldCols():this.renderFields(n),r)}}]),t}(n.Component),N=(a(20),a(13)),F=a.n(N),L=function(e,t){e.preventDefault(),e.target.blur(),t(e.target.id.split("-")[1])},k=function(e){var t,a=e.label,n=e.value,r=e.ondelete,o=e.onclick;return l.a.createElement("li",null,l.a.createElement("div",{className:"state"},l.a.createElement("button",{className:"btn-primary form-control",style:{width:"100%"},type:"submit",id:"select-".concat(n),onClick:function(e){return L(e,o)}},"".concat(a," (").concat((t=n,F()("dd/MM hh:mm:ss",new Date(parseInt(t,0)))),")"))),l.a.createElement("div",{className:"remove-state"},l.a.createElement("button",{className:"btn-sm btn-primary btn-warning",type:"submit",id:"delete-".concat(n),onClick:function(e){return L(e,r)}},"delete")))},M=function(e){var t=e.data,a=e.ondelete,n=e.onselect,r=e.onclick;return t.map?l.a.createElement("ul",null,t.map(function(e,t){var o=e.projectName,c=e.id,i="li-".concat(c,"-").concat(t);return l.a.createElement(k,{ondelete:a,key:"li-".concat(i),label:o||"untitled",value:c,onselect:n,onclick:r})})):""},V=function(e){var t=e.label,a=e.value;return l.a.createElement("li",null,l.a.createElement("div",{className:"label"},t),l.a.createElement("div",{className:"value"},a))},w=function(e){var t=e.data,a=e.id;return l.a.createElement("ul",null,t.map(function(e,t){var n=e.label,r=e.value,o="li-".concat(a,"-").concat(t);return l.a.createElement(V,{key:"li-".concat(o),label:n,value:r})}))},B=/^(GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4})$/,j=function(e){return B.test(e.toUpperCase())},D={rmBuy:{commercial:"https://www.rightmove.co.uk/commercial-property-for-sale/search.html?radius=0.25&includeSSTC=true&searchLocation=",residential:"https://www.rightmove.co.uk/property-for-sale/search.html?radius=0.25&includeSSTC=true&searchLocation="},rmRent:{commercial:"https://www.rightmove.co.uk/commercial-property-to-let/search.html?radius=0.25&includeLetAgreed=true&searchLocation=",residential:"https://www.rightmove.co.uk/property-to-rent/search.html?radius=0.25&includeLetAgreed=true&searchLocation="},nhpSold:"https://www.onthemarket.com/uk-house-prices/?property-type-prices=any&search-type=prices&sold-in=all-years&tenure=any&sold-prices-input=",gMap:"https://www.google.com/maps/place/"};function O(e){var t=e.href,a=e.text;return l.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:t},a)}var T=function(e){var t=e.postCode,a=e.askingPrice,n=e.monthlyRent,r=e.propertyValue,o=e.stampDutyType.startsWith("commercial")?"commercial":"residential",c=1e3,i=1e5,s=Math.ceil((a||r||4e5)/i*1.2)*i,u=Math.ceil((n||c)/c*1.2)*c;return t&&j(t)?l.a.createElement(l.a.Fragment,null,l.a.createElement(O,{href:D.nhpSold+t,text:"sold"})," | ",l.a.createElement(O,{href:"".concat(D.rmBuy[o]+t,"&maxPrice=").concat(s),text:"for sale"})," | ",l.a.createElement(O,{href:"".concat(D.rmRent[o]+t,"&maxPrice=").concat(u),text:"to let"})," | ",l.a.createElement(O,{href:D.gMap+t,text:"gmap"})):l.a.createElement("span",{style:{color:"red",fontStyle:"italic"}},"use a full valid post code to see links here")};var U=function(e){var t=e.data,a=e.currentState,n=t.dealFinance,r=t.buyToLet,o=t.stress,c=t.flip;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Links for this post code"),T(a)),l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Deal finance"),l.a.createElement(w,{id:"1",data:n})),l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Buy to let"),l.a.createElement(w,{id:"2",data:r})),l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Stress test"),l.a.createElement(w,{id:"3",data:o})),l.a.createElement("div",{className:"res-block"},l.a.createElement("h6",null,"Flip"),l.a.createElement(w,{id:"4",data:c})))},x=a(10),P=a.n(x),I=function(e,t,a,n){var l=e/100,r=P.a[t][a];if("first"===n&&"residential"===t){var o=P.a[t].first[a],c=o.limit,i=o.thresholds;(-1===c||e<=c)&&(r=i)}var s,u,d,m=0;if(!t||!a)return 0;for(var p=0;p<r.length;p+=1){d="investor"===n&&r[p].load||0,s=r[p].upto;var f=r[p].rate;if(u=p>0?r[p-1].upto:0,"end"===s)return m+=(l-u/100)*(f+d);if(e<=s)return m+=0===p?l*(f+d):(l-u/100)*(f+d);m+=(s-u)/100*(f+d)}return m},A=function(e,t,a,n,l,r,o,c,i){return e+t+a+n+l+I(r,o,c,i)+r},W=["Remortgage advance","Remortgage deposit","Remortgage fees","Money in","Money out","Money left in","Monthly rental","Monthly mortgage payment","MOE","Letting agent fees","Monthly free cashflow","Gross yield"],H=["Mortgage advance","Deposit","Stamp duty","Professional fees","Refurb/other costs","Total money in","Total cost"],G=["Sale price","Selling costs","Total input costs","Profit (before tax)","Gain(%)"],K=["Stress test","Minimum rent"],q=String.fromCharCode(37),X={freeCash:function(e){var t=e.loanToValue,a=e.propertyValue,n=e.doneUpValue,l=e.mortgageInterestRatePercent,r=e.monthlyRent,o=e.moePercent,c=e.agentsPercent,i=e.refurbCost,s=e.otherCost,u=e.stampDutyType,d=e.stampDutyRegion,m=e.stampDutyBuyer,p=e.remortgageFee,f=e.remortgageValuationFee,h=e.remortgageLegalFee,b=e.initMortgageFee,y=e.initLegalFee,v=e.initSurveyorsFee,g=e.repairingLease,E="yes"===g,S=t/100,C=Math.round(n*S),R=Math.round(n*(1-S)),N=Math.round(C*l/1200),F=E?0:r*o/100,L=E?0:r*c/100,k=r-("yes"===g?0:F)-N-L,M=p+f+h,V=b+y+v+(i+s)+I(a,u,d,m)+a,w=1200*r/V,B=W;return[{label:B[0],value:C.toFixed(2)},{label:B[1],value:R.toFixed(2)},{label:B[2],value:M.toFixed(2)},{label:B[3],value:V.toFixed(2)},{label:B[4],value:(C-M).toFixed(2)},{label:B[5],value:(V-(C-M)).toFixed(2)},{label:B[6],value:r.toFixed(2)},{label:B[7],value:N.toFixed(2)},{label:B[8],value:F.toFixed(2)},{label:B[9],value:L.toFixed(2)},{label:B[10],value:k.toFixed(2)},{label:B[11],value:w.toFixed(2)+q}]},initialFinance:function(e){var t=e.buyingCash,a=e.initialLoanToValue,n=e.propertyValue,l=e.initSurveyorsFee,r=e.initLegalFee,o=e.initMortgageFee,c=e.refurbCost,i=e.otherCost,s=e.stampDutyType,u=e.stampDutyRegion,d=e.stampDutyBuyer,m="yes"===t,p=a/100,f=m?0:Math.round(n*p),h=l+r+o,b=c+i,y=m?n:Math.round(n*(1-p)),v=I(n,s,u,d),g=A(l,r,o,c,i,n,s,u,d),E=g-f,S=H;return[{label:S[0],value:f.toFixed(2)},{label:S[1],value:y.toFixed(2)},{label:S[2],value:v.toFixed(2)},{label:S[3],value:h.toFixed(2)},{label:S[4],value:b.toFixed(2)},{label:S[5],value:E.toFixed(2)},{label:S[6],value:g.toFixed(2)}]},flip:function(e){var t=e.sellingLegalFee,a=e.agentSellingFee,n=e.initSurveyorsFee,l=e.initLegalFee,r=e.initMortgageFee,o=e.refurbCost,c=e.otherCost,i=e.propertyValue,s=e.stampDutyType,u=e.stampDutyRegion,d=e.stampDutyBuyer,m=e.doneUpValue,p=A(n,l,r,o,c,i,s,u,d),f=t+a,h=Math.round((m-p)/p*1e4)/100,b=h>=20?"green":"red",y=G;return[{label:y[0],value:m.toFixed(2)},{label:y[1],value:f.toFixed(2)},{label:y[2],value:p.toFixed(2)||"0"},{label:y[3],value:(m-(p+f)).toFixed(2)||"0",col:b},{label:y[4],value:h.toFixed(2)||0,col:b}]},allInputCosts:A,stressTest:function(e){var t=e.doneUpValue,a=e.monthlyRent,n=e.loanToValue,l=e.mortgageStressInterestRatePercent,r=e.mortgageStressMultipePercent,o=Math.ceil(t*n/100*l/1200*r/100),c=a>=o,i=K;return[{label:i[0],value:c?"pass":"fail"},{label:i[1],value:o.toFixed(2)}]},getCurrencyCode:function(e){return"ireland"===e.stampDutyType?8364:163}},J="https://localhost/comparisons",Y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={data:{dealFinance:[],buyToLet:[],stress:[],flip:[]},currency:163,savedStates:{Items:[]},currentState:{projectName:""},hasWorkingAPI:!1},a.calculate=a.calculate.bind(Object(f.a)(Object(f.a)(a))),a.saveState=a.saveState.bind(Object(f.a)(Object(f.a)(a))),a.deleteState=a.deleteState.bind(Object(f.a)(Object(f.a)(a))),a.selectState=a.selectState.bind(Object(f.a)(Object(f.a)(a))),a}return Object(p.a)(t,e),Object(m.a)(t,null,[{key:"setDefaultFormData",value:function(){var e={};return h.fields.map(function(t){return e[t.name]=t.defVal,!1}),e}}]),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.getSavedStates(!0)}},{key:"getSavedStates",value:function(e){var t=this,a=function(e,t){var a=e.projectName,n=e.id,l=t.projectName,r=t.id;return a+n<l+r?-1:a+n>l+r?1:0};fetch(J).then(function(e){return e.json()}).then(function(n){n.Items.length>0&&n.Items.sort(a),t.loadState(n,e)}).catch(function(){t.loadState(null,!0)})}},{key:"findState",value:function(e){return this.state.savedStates.Items.find(function(t){return t.id===e})}},{key:"loadState",value:function(e,a){var n={savedStates:e||{Items:[]},hasWorkingAPI:!!e};a&&(n.currentState=t.setDefaultFormData()),this.setState(n)}},{key:"calculate",value:function(e,t){var a=this.state.currentState,n=e?Object(i.a)({},a,Object(c.a)({},e,t)):a,l=X.initialFinance(n),r=X.freeCash(n),o=X.flip(n),s=X.stressTest(n),u=X.getCurrencyCode(n);document.getElementById("doc-title").text=n.projectName.replace(/ /g,"-");var d={data:{dealFinance:l,buyToLet:r,stress:s,flip:o},currency:u};e&&(d.currentState=n),this.setState(d)}},{key:"saveState",value:function(){var e=this,t=this.state.currentState,a=t.projectName,n=t.postCode;""!==a&&""!==n&&fetch(J,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(){e.getSavedStates(!1)}).catch(function(){return e.setState({savedStates:{Items:"No save service available"}})}).finally(function(){e.setState({error:null})})}},{key:"deleteState",value:function(e){var t=this;fetch(J,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:e})}).then(function(a){if(!a.ok)throw new Error("delete failed");var n=t.state.currentState;t.getSavedStates(e===n.id)}).catch(function(){return t.setState({savedStates:{Items:"No delete service avaialable"}})})}},{key:"selectState",value:function(e){var t=this,a=this.findState(e);this.setState({currentState:a},function(){return t.calculate()})}},{key:"handleNew",value:function(e){var a=this;e.preventDefault(),this.setState({currentState:t.setDefaultFormData()},function(){return a.calculate()}),e.target.blur()}},{key:"render",value:function(){var e=this,t=this.state,a=t.currency,n=t.savedStates,r=t.currentState,o=t.hasWorkingAPI,c=t.error,i=r.projectName,s=r.postCode,u=o&&""!==i&&""!==s,d=n.Items,m=d?l.a.createElement(M,{data:d,ondelete:this.deleteState,onclick:this.selectState}):"",p=""!==r.projectName?l.a.createElement("ul",{className:"right"},l.a.createElement("li",null,l.a.createElement("button",{type:"submit",className:"btn-primary form-control",onClick:function(t){return e.handleNew(t)}},"new"))):"";return Object.keys(r).length>1?l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"column",style:{textAlign:"center"}},l.a.createElement("h5",null,"Property investment deal analyser"),l.a.createElement(R,{name:"propcalc",fields:h.fields,formData:r,twocols:"yes",calculate:this.calculate,currsymbol:a,onsave:this.saveState,showsave:u,error:c}),p),l.a.createElement("div",{className:"column results"},U(this.state)),l.a.createElement("div",{className:"column states"},m)):""}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(21);o.a.render(l.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.ff1e5d0f.chunk.js.map