
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export async function sendWhatsApp(item) {
    const {FotoName, telefone, Sexo, Vacina, Vermifugado, Castrado} = item
    
    var moldura = () => {
        if(Sexo=='Macho'){        
            return 'moldura-MACHO.png';        
        }else{        
            return 'moldura-FEMEA.png';        
        }
    }
    var vermifugado = () => {
        if(Vermifugado){
            return 'Sim'
        }else{
            return 'Não'
        }
    }
    var vacina = () => {
        if(Vacina){
            return 'Sim'
        }else{
            return 'Não'
        }
    }
    
    var castrado = () => {
        if(Castrado){
            return 'Sim'
        }else{
            return 'Não'
        }
    }
    
    const downloadInstance = FileSystem.createDownloadResumable(
        'https://ik.imagekit.io/adote/'+FotoName+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',fs-25,w-300,ly-975,lx-250,ia-left,l-end,l-end:l-text,i-'+vermifugado()+',fs-25,ly-1025,lx-285,ia-left,l-end:l-text,i-'+vacina()+',fs-25,ly-1080,lx-280,ia-left,l-end:l-text,i-'+castrado()+',fs-25,ly-1127,lx-235,ia-left,l-end',
        FileSystem.documentDirectory + FotoName,
        {
        cache: true
        }
    );
    let linnk = 'https://ik.imagekit.io/adote/'+FotoName+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',fs-25,w-300,ly-975,lx-250,ia-left,l-end,l-end:l-text,i-'+vermifugado()+',fs-25,ly-1025,lx-285,ia-left,l-end:l-text,i-'+vacina()+',fs-25,ly-1080,lx-280,ia-left,l-end:l-text,i-'+castrado()+',fs-25,ly-1127,lx-235,ia-left,l-end'
    console.log('https://ik.imagekit.io/adote/'+FotoName+'?tr=w-650,h-1341,cm-pad_extract,bg-F3F3F3,l-image,i-'+moldura()+',h-1341,l-text,i-'+telefone+',fs-25,w-300,ly-975,lx-250,ia-left,l-end,l-end:l-text,i-'+vermifugado()+',fs-25,ly-1025,lx-285,ia-left,l-end:l-text,i-'+vacina()+',fs-25,ly-1080,lx-280,ia-left,l-end:l-text,i-'+castrado()+',fs-25,ly-1127,lx-235,ia-left,l-end')
    const result = await downloadInstance.downloadAsync(linnk);
    Sharing.shareAsync(result.uri)
}