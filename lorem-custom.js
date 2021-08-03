#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Lorem custom
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🤖
// @raycast.argument1 { "type": "text", "placeholder": "number" }
// @raycast.argument2 { "type": "text", "placeholder": "words (w) or paragraphs (p)" }


//console.log("Hello World! Argument1 value: " + process.argv.slice(2)[0])

let desiredAmount = parseInt(process.argv.slice(2)[0], 10)
const type = process.argv.slice(2)[1].charAt(0).toLowerCase();
let loremForClipboard = ''

//Quick check that the desiredAmount is actually a number. Default to 3 for the sake of failing gracefully
if(!Number.isInteger(desiredAmount)) {
    desiredAmount = 3;
    console.log('\"' +  process.argv.slice(2)[0] + '\" was not recognised as a number, so generateing ' + desiredAmount + ' instead');   
}

//simple little pluralisation function
function pluraliser(word){
    if(desiredAmount>=2) {
        return word + 's'
    }
    else {
        return word
    }
}


//the lorem we're working with
const loremArray = [
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper sit amet est vitae consequat. Morbi ullamcorper dolor a nunc euismod convallis. Integer in tincidunt lectus. Aenean iaculis vel orci non tincidunt. Nam imperdiet vulputate semper. Nullam sollicitudin odio sed tincidunt ultricies. Vivamus a nisl nisi. Donec ac varius libero. Donec dictum massa non vulputate convallis. Praesent id risus pretium, faucibus lorem a, imperdiet elit. Donec rhoncus, odio nec rutrum suscipit, arcu ex malesuada tortor, nec ultricies ipsum velit sit amet ipsum. Praesent quis iaculis enim. Donec varius ullamcorper risus, quis viverra enim tincidunt vel. Aliquam convallis, erat sit amet ullamcorper bibendum, arcu risus scelerisque elit, ac sodales mi leo vel orci.',
'Etiam vehicula mi sit amet lacus aliquet viverra. Sed quis orci ullamcorper, lacinia nisi eu, volutpat sapien. Sed arcu mauris, elementum sed purus nec, facilisis dictum nisi. Proin ligula sapien, commodo non vehicula rutrum, varius eu purus. Donec laoreet diam quis sapien lobortis, ac rhoncus ex lobortis. Cras dignissim rutrum quam id varius. Integer dapibus venenatis viverra. Morbi nisi enim, fringilla vitae malesuada vitae, ornare at tellus. Maecenas ligula dolor, suscipit et dignissim aliquam, malesuada quis elit. Praesent diam dolor, rutrum quis suscipit vel, scelerisque eu erat.',
'Aenean eget mauris porttitor, eleifend odio sed, consectetur metus. Sed sed eleifend urna, euismod dictum tellus. Mauris dapibus nulla porta vestibulum feugiat. Morbi nec posuere lectus. Ut vitae massa feugiat, feugiat odio sit amet, mollis nulla. Nam mollis tortor vel dolor rutrum tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas in tortor in erat sollicitudin sodales non at nibh. Nullam id diam a magna molestie commodo. Etiam sem tellus, auctor sed nibh quis, vestibulum congue tortor.',
'Curabitur pellentesque justo non velit aliquet tincidunt. Aliquam blandit ultricies urna et consequat. Donec imperdiet magna eget enim congue, ut ullamcorper lectus pulvinar. Phasellus et tincidunt nibh, at eleifend eros. Nullam in odio eleifend, suscipit mauris convallis, vehicula nisl. Sed fermentum tristique luctus. Vivamus convallis dolor ut dui viverra scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras felis purus, varius non ante eu, rhoncus imperdiet orci. Praesent volutpat et dolor sed sodales. Quisque cursus convallis accumsan. Aliquam erat volutpat.',
'Fusce vel quam nunc. Donec quis cursus ex. Suspendisse ac massa a ligula dictum dapibus ac at purus. In lectus neque, varius at vehicula vitae, tempor vulputate quam. Fusce ullamcorper nec eros a tincidunt. Aliquam tincidunt eleifend dui, eget hendrerit sapien semper dictum. Integer iaculis, eros quis viverra auctor, nulla odio lobortis sem, eget hendrerit nulla dui sit amet ipsum. Fusce luctus ligula id nunc pellentesque, sollicitudin commodo turpis congue. Aliquam erat volutpat. Morbi id eleifend neque. Quisque at nulla eget quam euismod tempor. Vestibulum quis elit consectetur, viverra est nec, blandit urna. Mauris sodales, justo ac congue bibendum, sem leo scelerisque odio, vel tempus risus ipsum ut purus. Phasellus faucibus gravida arcu sed scelerisque.',
'Fusce porttitor molestie ligula, id elementum massa. Ut ultrices nec libero sed pharetra. Sed vehicula nec justo in vehicula. Praesent porttitor a tellus sodales tempor. Nullam convallis id nulla in rhoncus. Quisque malesuada, tellus vel consectetur condimentum, ligula neque pulvinar erat, quis pretium felis sem sed magna. Duis a dolor bibendum, semper justo a, ullamcorper dui. Mauris arcu justo, mollis ut varius sed, fringilla id risus. Aliquam sagittis pellentesque facilisis. Vestibulum maximus, risus eu facilisis iaculis, leo dui pretium lacus, in finibus tortor orci non enim. Sed enim lorem, interdum in turpis non, aliquam auctor urna. In efficitur posuere porta. Etiam ultrices leo nec dui vestibulum, eu ornare tortor bibendum.',
'Vivamus ullamcorper sapien ut ante varius, ac scelerisque lacus rutrum. Curabitur sed lorem ligula. Aliquam semper rutrum magna, sed pulvinar turpis interdum mattis. Morbi accumsan justo non nisi semper, in elementum elit bibendum. Donec fringilla elit turpis, sit amet vulputate lacus imperdiet id. Ut at ex sit amet massa convallis placerat. Quisque vitae nibh quam. Suspendisse potenti. Morbi turpis felis, dictum convallis odio id, cursus mollis nunc. Aenean id accumsan dolor. Nam sollicitudin sed risus at convallis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce a tortor sed eros semper dignissim. Nunc porttitor arcu ligula, quis condimentum purus blandit nec.',
'In pharetra mauris a consectetur varius. Aliquam varius justo et dui sodales, eu mollis ante dapibus. Quisque ac lorem eu erat fringilla ornare. Nam pretium odio dolor, in vestibulum elit consectetur sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer dignissim elit non commodo scelerisque. Curabitur in libero tempor, feugiat ligula in, porttitor lectus. Proin sit amet lacus lacinia justo faucibus finibus. Proin congue elementum orci non aliquam. Nullam non congue nunc, sed tempus nulla. Donec fringilla leo quis dignissim elementum. Donec convallis, leo at ultricies tincidunt, dui ligula mollis ex, non convallis ipsum mi ac massa. In tincidunt mi tellus, quis condimentum lacus efficitur at. Sed hendrerit ex in nisl vulputate, at egestas elit condimentum. Vestibulum in ultrices nulla.',
'Suspendisse at erat ut erat tempus consectetur. In aliquet enim risus. Ut euismod augue vitae enim tempor, vel bibendum ipsum convallis. In hac habitasse platea dictumst. Vivamus dictum lacinia placerat. Suspendisse pulvinar dui id magna blandit, ac maximus urna pretium. Nam quis dignissim nisl, eget facilisis justo. Vestibulum sed sagittis leo.',
'Mauris lectus elit, tempus eget tellus et, viverra faucibus diam. Cras et auctor quam. Sed tristique consectetur porttitor. Donec commodo odio quis justo blandit varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas fermentum ultricies mi, a iaculis quam lacinia in. Pellentesque molestie ex at augue finibus, eget porttitor ligula ultricies. Integer convallis purus at ex semper, sed maximus felis vulputate. Sed nec tortor ullamcorper neque aliquet imperdiet nec in tortor. Vestibulum interdum massa mi, quis fringilla velit feugiat in. Curabitur ornare tempor lectus, quis dapibus neque hendrerit quis. Mauris scelerisque turpis purus, ut luctus mi vulputate non. Phasellus facilisis lorem viverra, euismod massa non, interdum dui. Quisque mattis lectus sed accumsan mollis. Phasellus sapien mi, semper vel nisl varius, aliquet fermentum tellus. Morbi tempor tincidunt lobortis.',
'Mauris odio enim, sodales id elit ac, convallis gravida tellus. Suspendisse congue, mauris quis consequat lobortis, augue urna luctus urna, commodo gravida dui augue sed urna. Fusce eu velit sit amet elit vestibulum sollicitudin. Curabitur ex turpis, maximus quis tristique ac, ultricies quis turpis. Cras vehicula, tortor ut tincidunt rhoncus, ex sem malesuada lacus, eu gravida erat nunc ac sapien. Morbi augue mauris, ornare vitae lorem id, condimentum ornare massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ex quam, porta sed elementum et, porttitor eget ligula. In at congue risus. Suspendisse potenti. Phasellus accumsan leo odio, nec commodo purus scelerisque a.',
'Nam volutpat, felis ac tristique rhoncus, diam turpis viverra libero, in faucibus risus turpis quis sem. Cras quis iaculis ex, et ultrices nunc. Nam iaculis quis ligula eget lacinia. Curabitur posuere a orci a iaculis. Maecenas sollicitudin lorem non neque finibus euismod. Nunc molestie porttitor arcu. Proin et massa tristique, semper neque eu, euismod risus.',
'Etiam in lacus ac lorem faucibus dapibus. Proin vestibulum erat sed turpis hendrerit dictum. In nec pellentesque arcu, eu pretium quam. Etiam cursus lacus elit. Etiam faucibus vehicula metus, vitae gravida ligula volutpat sit amet. Nunc et velit id sapien tempus tristique vel eu turpis. Nullam nunc justo, pretium a sem quis, commodo luctus nisl. Integer volutpat varius sapien, eu egestas elit fringilla id. Sed et semper ante. Fusce ultrices imperdiet purus id condimentum. Vivamus sed congue nisl. Quisque ut velit faucibus, ornare nisi vitae, luctus lorem. Ut leo arcu, rutrum at malesuada eu, imperdiet ut arcu. Sed dictum nunc eu viverra congue.',
'In hac habitasse platea dictumst. Etiam volutpat sapien eu magna dictum dictum. Mauris ultricies lacinia nibh ut lobortis. Ut mollis nunc nec purus interdum, laoreet ultricies elit maximus. Cras dictum, tellus et hendrerit commodo, orci eros ullamcorper lorem, non suscipit felis sem venenatis neque. Phasellus sit amet sagittis turpis. Donec tellus eros, ultricies ac lacus in, viverra porta nunc. Sed egestas velit sit amet diam porta interdum at at mauris. Suspendisse est nisi, lobortis id efficitur vel, finibus et magna. Integer sodales urna eu gravida sodales. In congue pretium tortor quis ornare. Mauris vulputate dolor nunc, sed semper quam posuere vitae.',
'Nam sit amet orci aliquam, molestie dui eu, varius lectus. Etiam auctor lacus risus, quis egestas massa feugiat id. Fusce justo lacus, dapibus in enim ac, varius dictum purus. Fusce mattis libero eu dolor fermentum laoreet. Fusce porta felis maximus arcu scelerisque, faucibus feugiat urna dignissim. Duis sed nunc eu lectus ultricies aliquam ut nec turpis. Aliquam erat volutpat. Aenean a nulla et orci bibendum tincidunt a non est. Integer eros leo, luctus sit amet congue sed, ultricies eget sem. Sed lacinia imperdiet eros, tincidunt mollis libero finibus nec. Nunc ultrices aliquam leo id pulvinar. Proin eget finibus diam.',
'Vivamus pulvinar ultrices augue, sit amet vehicula erat luctus quis. Aenean varius consequat augue, vitae suscipit dui tristique eu. Pellentesque mattis rhoncus est, a aliquet augue porta non. Sed nunc ligula, maximus sed purus vel, pulvinar viverra augue. Donec tempus aliquet diam, at lobortis ex imperdiet vulputate. Sed lectus dui, rhoncus id sem quis, dignissim fringilla massa. Curabitur quis pharetra dui. Vivamus at est pharetra, elementum risus quis, fringilla quam. Quisque ornare magna at elit finibus, nec euismod lorem sollicitudin. Ut velit arcu, dapibus quis ante quis, rutrum placerat sem. Curabitur mattis ut ex sit amet mollis. Aliquam at accumsan turpis.',
'Etiam tempus maximus justo vitae scelerisque. Donec lobortis arcu ut augue ornare, quis dictum arcu porta. Praesent a pretium elit. Nulla facilisi. Integer euismod est nibh, vehicula efficitur nibh dignissim vel. Aenean sed iaculis risus, vel aliquet risus. Aliquam erat volutpat. In cursus massa a nulla imperdiet aliquam. Fusce mollis hendrerit massa, eu fermentum enim pellentesque eu. Donec sit amet ex non sem pharetra imperdiet vitae ut libero. Nulla rhoncus nisi risus. Nam quis varius metus.',
'Ut mollis ex in congue feugiat. Suspendisse metus diam, porttitor id pretium sit amet, volutpat in quam. In hac habitasse platea dictumst. Suspendisse porta mollis neque, placerat gravida quam laoreet eu. Sed gravida, nibh pharetra aliquet convallis, quam justo tristique massa, id tempor leo nibh et felis. Sed nisi leo, dapibus quis fermentum a, viverra nec ipsum. Praesent massa est, tincidunt ac nibh in, accumsan aliquet mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In hac habitasse platea dictumst. Sed rutrum egestas nulla ac rhoncus. Vestibulum hendrerit nisl mauris. Phasellus urna quam, commodo suscipit diam at, commodo tincidunt velit. Sed vitae blandit dui, sed ultrices sapien. Nulla sollicitudin mauris nec eros venenatis, a mattis dolor vehicula.',
'Suspendisse scelerisque, mi vel euismod consequat, libero libero interdum diam, vel lacinia velit nunc ac elit. Nulla facilisi. Maecenas a fringilla tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet sagittis erat. In a libero sit amet quam interdum aliquet vel sit amet dui. Mauris mauris turpis, fringilla ac commodo at, hendrerit ut lorem. Donec quis elementum nunc, et porttitor sapien.',
'Aliquam faucibus sodales leo in egestas. Cras leo nibh, lobortis sed lacinia a, consequat eu ex. Duis fringilla vulputate augue sed ultrices. Integer arcu odio, venenatis nec ligula sit amet, cursus iaculis metus. In imperdiet ac lacus et luctus. Etiam laoreet nisl quis malesuada varius. Cras malesuada odio quis elementum convallis. Cras ut ligula vehicula, interdum velit in, feugiat arcu. Nulla fringilla tincidunt mattis. Praesent id ante volutpat, sollicitudin diam quis, aliquet felis. Sed eget arcu id nisi sodales varius quis non ipsum. Etiam auctor mi malesuada risus porttitor ornare. Etiam ac bibendum lacus. Aenean scelerisque nunc ac pharetra euismod.'
]

//helper func to copy to clipboard
function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(data); proc.stdin.end();
}


//For shuffling arrays to a desired length
function shuffle(array, desiredLength) {
    //expand the array to desired length if user has asked for more than we have
    if(desiredLength > loremArray.length){
        const originalLen = loremArray.length;
        for (let i = array.length; i < desiredLength; i++) {
            let item = array[i-originalLen]
            array[i] = item;
        }
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
}


 if(type == 'p'){

    shuffle(loremArray, desiredAmount)
    loremForClipboard = loremArray.slice(0, desiredAmount).join('\n');

    console.log('copied ' + desiredAmount + ' ' + pluraliser('paragraph') + ' to the clipboard');
    pbcopy(loremForClipboard)


    
}

else if(type === 'w'){

    let newPara = '';
    //turn our original lorem array into one big string, we'll pull words from it.
    let origin = loremArray.join().split(" ");

    for (let i = 0; i < desiredAmount; i++) {

        let randomIndex = Math.floor(Math.random() * origin.length);
        
        if(i == 0){
            newPara += origin[randomIndex].charAt(0).toUpperCase() + origin[randomIndex].slice(1)
        }

        
        else {
            newPara += " " + origin[randomIndex].toLowerCase();
        
        }

        //Looks a bit odd if it starts with a 2 or 3 word sentence
        if(i <= 4){
            newPara.replace('.', '');
        }
    }
    loremForClipboard = newPara;

    console.log('copied ' + desiredAmount + ' ' + pluraliser('word') + ' to the clipboard');
    pbcopy(loremForClipboard)

}

else {
    console.log('Insead of \"' + process.argv.slice(2)[1] +'\" type "w" to generate ' + desiredAmount + ' words, or "p" to  ' + desiredAmount + ' generate paragraphs')
}
