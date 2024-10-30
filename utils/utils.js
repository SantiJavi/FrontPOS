
export async function firmarXML(firma,xml,clave,ruta){
      const result = await sign(firma,clave,xml);
      //const result = await sign(obtenerArchivoP12(),"rodrigo2007",xml);
      return result;
}
async function getP12(path){
        const Response=await fetch(path);
        if(!Response.ok){
            throw new Error(`Failed ${Response.status} ${Response.statusText}`);
        }
        const data=await Response.arrayBuffer();
        return data;
}
async function getXML(content){    
        if (!content) {
            throw new Error('El contenido XML no puede estar vacío o nulo.');
        }
        return content;
}
async function sign(p12Path,p12Password,xmlPath){
        const arrayBuffer = await getP12(p12Path);
        let xml = await getXML(xmlPath);
        xml= xml.replace(/^s+/g," ");
        xml=xml.trim();
        xml=xml.replace(/(?<=\>)(\r?\n)|(\r?\n)(?=\<V)/g,"");
        xml=xml.trim();
        xml=xml.replace(/(?<=\>)(\s*)/g,"");
        
        const arrayUint8=new Uint8Array(arrayBuffer);
        const b64=forge.util.binary.base64.encode(arrayUint8);
        const der = forge.util.decode64(b64);
        const Asn1=forge.asn1.fromDer(der);
        const p12=forge.pkcs12.pkcs12FromAsn1(Asn1,p12Password);
        const Pkcs8Bags = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag,});
        const certBags = p12.getBags({bagType: forge.pki.oids.certBag,});
        const CertBag=certBags[forge.oids.certBag];
        const FriendlyName=CertBag[1].attributes.friendlyName[0];
        let certificate;
        let pkcs8;
        let issuerName='';
        const cert = CertBag.reduce((prev, curr)=>{
                const attributes= curr.cert.extensions;
                return attributes.length > prev.cert.extensions.length ? curr : prev;
        });
        const issuerAttrs= cert.cert.issuer.attributes;
        issuerName = issuerAttrs.reverse().map(attr =>{
                return `${attr.shortName}=${attr.value}`;
        }).join(', ');
        if(/BANCO CENTRAL/i.test(FriendlyName)){
                let keys = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag];
                for (let i = 0; i < keys.length; i++) {
                    const element = keys[i];
                    let friendlyName = element.attributes.friendlyName[0];
                    if(/Signing Key/i.test(friendlyName)){
                        pkcs8 = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag][i];
                    }            
                }       
        }
        if(/SECURITY DATA/i.test(FriendlyName)){
                pkcs8 = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag][0];        
        }
        certificate = cert.cert;
        const notBefore= certificate.validity['notBefore'];
        const notAfter= certificate.validity['notAfter'];
        const currentDate = new Date();
        if(currentDate <notBefore ||  currentDate>notAfter){
                throw new Error("Invalid certiicate, certificate has expired");
        }
        const key = pkcs8.key ?? pkcs8.asn1; //con un ? devuelvo dos valores, con ?? devuelvo uno de los valores en la misma variable
        const certificateX509_pem= forge.pki.certificateToPem(certificate);
        let certificateX509 = certificateX509_pem.substring(
                certificateX509_pem.indexOf("\n")+1, 
                certificateX509_pem.indexOf("\n-----END CERTIFICATE-----")
        );
        certificateX509 = certificateX509.replace(/\r?\n|\r/g, '');
        certificateX509 = certificateX509.match(/.{1,76}/g).join('\n');
        const certificateX509_asn1 = forge.pki.certificateToAsn1(certificate);
        const certificateX509_der = forge.asn1.toDer(certificateX509_asn1).getBytes();
        const hash_certificateX509_der = sha1_base64(certificateX509_der);
        const certificateX509_serialNumber=parseInt(certificate.serialNumber,16);
        const exponent = hexToBase64(key.e.data[0].toString(16));
        const modulus=bigIntToBase64(key.n);
        xml = xml.replace(/^t|\r/g,"");
        
        const sha1_xml= sha1_base64(xml.replace('<?xml version="1.0" encoding="UTF-8"?>',""),
            "UTF-8"
        );
        
        const namespaces='xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#"';
        //numeros aleatorios
        const Certificate_number = getRandomNumber();
        const Signature_number=getRandomNumber();
        const Signedpropierties_number=getRandomNumber();
        const SignedInfo_number=getRandomNumber();
        const ReferencID_number=getRandomNumber();
        const SignatureValue_number=getRandomNumber();
        const Object_number=getRandomNumber();
        const SignedPropertiesID_number=getRandomNumber();
        const isoDateTime=currentDate.toISOString().slice(0,19);
        let SignedPropierties='';    
        SignedPropierties+='<etsi:SignedProperties Id="Signature'+Signature_number+'-SignedProperties'+Signedpropierties_number+'">';
        SignedPropierties+='<etsi:SignedSignatureProperties>';
        SignedPropierties+='<etsi:SigningTime>'+isoDateTime+'</etsi:SigningTime>';
        SignedPropierties+='<etsi:SigningCertificate>';
        SignedPropierties+='<etsi:Cert>';
        SignedPropierties+='<etsi:CertDigest>';
        SignedPropierties+='<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
        SignedPropierties+='</ds:DigestMethod>';
        SignedPropierties+='<ds:DigestValue>';
        SignedPropierties+=hash_certificateX509_der;
        SignedPropierties+='</ds:DigestValue>'; 
        SignedPropierties+='</etsi:CertDigest>';
        SignedPropierties+='<etsi:IssuerSerial>';
        SignedPropierties+='<ds:X509IssuerName>';
        SignedPropierties+=issuerName;
        SignedPropierties+='</ds:X509IssuerName>';
        SignedPropierties+='<ds:X509SerialNumber>'
        SignedPropierties+= certificateX509_serialNumber;
        SignedPropierties+='</ds:X509SerialNumber>'
        SignedPropierties+='</etsi:IssuerSerial>';
        SignedPropierties+='</etsi:Cert>';
        SignedPropierties+='</etsi:SigningCertificate>';    
        SignedPropierties+='</etsi:SignedSignatureProperties>';
        
        SignedPropierties+='<etsi:SignedDataObjectProperties>';
        SignedPropierties+='<etsi:DataObjectFormat ObjectReference="#Reference-ID-'+ReferencID_number+'">';
        SignedPropierties+='<etsi:Description>';
        SignedPropierties+='contenido comprobante';
        SignedPropierties+='</etsi:Description>';
        SignedPropierties+='<etsi:MimeType>';
        SignedPropierties+='text/xml';
        SignedPropierties+='</etsi:MimeType>';
        SignedPropierties+='</etsi:DataObjectFormat>';
        SignedPropierties+='</etsi:SignedDataObjectProperties>';
        SignedPropierties+="</etsi:SignedProperties>"
        
        const sha1_SignedProperties = sha1_base64(SignedPropierties.replace('<etsi:SignedProperties','<etsi:SignedProperties '+namespaces));
        let keyInfo='';
        keyInfo+='<ds:KeyInfo Id="Certificate' + Certificate_number+'">';
        keyInfo+='\n<ds:X509Data>';
        keyInfo+='\n<ds:X509Certificate>\n';
        keyInfo+=certificateX509;
        keyInfo+='\n</ds:X509Certificate>';
        keyInfo+='\n</ds:X509Data>';
        keyInfo+='\n<ds:KeyValue>';
        keyInfo+='\n<ds:RSAKeyValue>';
        keyInfo+='\n<ds:Modulus>\n';
        keyInfo+=modulus;    
        keyInfo+='\n</ds:Modulus>'    
        keyInfo+='\n<ds:Exponent>\n'
        keyInfo+=exponent;
        keyInfo+='\n</ds:Exponent>'
        keyInfo+='\n</ds:RSAKeyValue>'
        keyInfo+='\n</ds:KeyValue>';
        keyInfo+='\n</ds:KeyInfo>';
        const sha1_KeyInfo=sha1_base64(keyInfo.replace("<ds:KeyInfo","<ds:KeyInfo "+namespaces));

        let SignedInfo='';
        SignedInfo+='<ds:SignedInfo Id="Signature-SignedInfo'+SignedInfo_number+'">';
        SignedInfo+='\n<ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315">';
        SignedInfo+='</ds:CanonicalizationMethod>';
        SignedInfo+='\n<ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1">';
        SignedInfo+='</ds:SignatureMethod>';
        SignedInfo+='\n<ds:Reference Id="SignedPropertiesID'+SignedPropertiesID_number+'" Type="http://uri.etsi.org/01903#SignedProperties" URI="#Signature'+Signature_number+'-SignedProperties'+Signedpropierties_number+'">';
        SignedInfo+='\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
        SignedInfo+='</ds:DigestMethod>';
        SignedInfo+='\n<ds:DigestValue>';
        SignedInfo+=sha1_SignedProperties;
        SignedInfo+='</ds:DigestValue>';
        SignedInfo+='\n</ds:Reference>';

        SignedInfo+='\n<ds:Reference URI="#Certificate'+Certificate_number+'">';
        SignedInfo+='\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
        SignedInfo+='</ds:DigestMethod>';
        SignedInfo+='\n<ds:DigestValue>';
        SignedInfo+=sha1_KeyInfo;
        SignedInfo+='</ds:DigestValue>';
        SignedInfo+='\n</ds:Reference>';

        SignedInfo+='\n<ds:Reference Id="Reference-ID-'+ReferencID_number+'" URI="#comprobante">';    
        SignedInfo+='\n<ds:Transforms>';
        SignedInfo+='\n<ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature">';
        SignedInfo+='</ds:Transform>';
        SignedInfo+='\n</ds:Transforms>';

        SignedInfo+='\n<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">';
        SignedInfo+='</ds:DigestMethod>';
        SignedInfo+='\n<ds:DigestValue>';
        SignedInfo+=sha1_xml;
        SignedInfo+='</ds:DigestValue>';

        SignedInfo+='\n</ds:Reference>';
        SignedInfo+='\n</ds:SignedInfo>';
        const canonicalized_SignedInfo=SignedInfo.replace(
                "<ds:SignedInfo","<ds:SignedInfo "+namespaces);
        const md= forge.md.sha1.create();
        md.update(canonicalized_SignedInfo,'utf8');
        let signature =btoa(key.sign(md)).match(/.{1,76}/g).join("\n");
        let xades_bes='';
        xades_bes+='<ds:Signature '+namespaces+' Id="Signature'+Signature_number+'">';
        xades_bes+='\n'+SignedInfo;
        xades_bes+='\n<ds:SignatureValue Id="SignatureValue'+SignatureValue_number+'">\n';
        xades_bes+=signature;
        xades_bes+='\n</ds:SignatureValue>';
        xades_bes+='\n'+keyInfo;
        xades_bes+='\n<ds:Object Id="Signature'+Signature_number+'-Object'+Object_number+'">';
        xades_bes+='<etsi:QualifyingProperties Target="#Signature'+Signature_number+'">';
        xades_bes+=SignedPropierties;
        xades_bes+='</etsi:QualifyingProperties>';
        xades_bes+='</ds:Object>';
        xades_bes+='</ds:Signature>';
        let signed=xml.replace(/(<[^<]+)$/,xades_bes+"$1");
        return signed;
}

function getRandomNumber(min=10000,max=99999){        
        return Math.floor(Math.random() * 999000) + 990;    
}

function sha1_base64(txt,encoding){
        var md = forge.md.sha1.create();
        md.update(txt);        
        return new window.buffer.Buffer(md.digest().toHex(), 'hex').toString('base64');     
}
function hexToBase64(hexStr){
        var hex = ('00' + hexStr).slice(0 - hexStr.length - hexStr.length % 2);    
        return btoa(String.fromCharCode.apply(null,
        hex.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
        );   
}
function bigIntToBase64(bigInt){
        const HexString=bigInt.toString(16);
        const HexPairs= HexString.match(/.{2}/g);
        const Bytes= HexPairs.map((pair)=>parseInt(pair,16));
        const ByteString=String.fromCharCode(...Bytes);
        const Base64 =btoa(ByteString);
        const FormateDBase64=Base64.match(/.{1,76}/g).join("\n");
        return FormateDBase64;
}

async function getP12Modificado(path){        
        const Response=await fetch(path);
        if(!Response.ok){
            throw new Error(`Failed ${Response.status} ${Response.statusText}`);
        }
        const data=await Response.arrayBuffer();
        return data;
}

export async function getFechaExpiracionFirma(p12Path,p12Password){
        const arrayBuffer = await getP12Modificado(p12Path);
        
        const arrayUint8=new Uint8Array(arrayBuffer);
        const b64=forge.util.binary.base64.encode(arrayUint8);
        const der = forge.util.decode64(b64);
        const Asn1=forge.asn1.fromDer(der);
        const p12=forge.pkcs12.pkcs12FromAsn1(Asn1,p12Password);
        const Pkcs8Bags = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag,});
        const certBags = p12.getBags({bagType: forge.pki.oids.certBag,});
        const CertBag=certBags[forge.oids.certBag];
        const FriendlyName=CertBag[1].attributes.friendlyName[0];
        let certificate;
        let pkcs8;
        let issuerName='';
        const cert = CertBag.reduce((prev, curr)=>{
                const attributes= curr.cert.extensions;
                return attributes.length > prev.cert.extensions.length ? curr : prev;
        });
        const issuerAttrs= cert.cert.issuer.attributes;
        issuerName = issuerAttrs.reverse().map(attr =>{
                return `${attr.shortName}=${attr.value}`;
        }).join(', ');
        if(/BANCO CENTRAL/i.test(FriendlyName)){
                let keys = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag];
                for (let i = 0; i < keys.length; i++) {
                    const element = keys[i];
                    let friendlyName = element.attributes.friendlyName[0];
                    if(/Signing Key/i.test(friendlyName)){
                        pkcs8 = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag][i];
                    }            
                }       
        }
        if(/SECURITY DATA/i.test(FriendlyName)){
                pkcs8 = Pkcs8Bags[forge.oids.pkcs8ShroudedKeyBag][0];        
        }
        certificate = cert.cert;        
        return certificate.validity['notAfter'];        
}

export const formasPago=[
        {id:"c_u_s_f",detalle:"OTROS CON UTILIZACION DEL SISTEMA FINANCIERO",cod:"20"},
        {id:"s_u_s_f",detalle:"SIN UTILIZACION DEL SISTEMA FINANCIERO",cod:"01"},
        {id:"comp_deudas",detalle:"OMPENSACION DE DEUDAS",cod:"15"},
        {id:"t_debito",detalle:"TARJETA DE DEBITO",cod:"16"},
        {id:"dinero_electronico",detalle:"DINERO ELECTRONICO",cod:"17"},
        {id:"t_credito",detalle:"TARJETA DE CREDITO",cod:"19"},
        {id:"t_prepago",detalle:"TARJETA PREPAGO",cod:"18"},
        {id:"endoso",detalle:"ENDOSO DE TITULOS",cod:"21"}, 
];


export async function obtenerArchivoP12() {
        const apiResourceFirma = 'http://localhost/APIFacturacionNuevo/apifacturacion/public/api/downloadp12';
        try{
             const response = await fetch(apiResourceFirma);
             if (!response.ok) {
                throw new Error(`Error al obtener el archivo .p12: ${response.statusText}`);
              }              
              return await response; 
        }catch(error){
                console.error('Error al obtener el archivo .p12:', error);
                throw error;
        }
}