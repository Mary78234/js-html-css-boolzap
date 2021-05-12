
const app = new Vue({
  el: '#app',
  data: {
    contacts: [
      {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent'
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
          {
            date: '20/03/2020 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
          }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
          {
            date: '28/03/2020 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      },
    ],
    avatarActive: 0,
    strText: '',
    strSearch: ''

  },//and of data
  methods: {
    changeAvatar(index){
      this.avatarActive = index;
    },

    //milestone 3
    pushText(){

      if(this.strText.length > 0){
        this.sentMess(this.strText, 'sent');
      }

      this.strText = '';
      
      setTimeout(() => {
        this.sentMess('ok', 'received');
      }, 1000);

    },

    sentMess(text, status){
      this.now = dayjs().format('DD/MM/YYYY HH:mm:ss');
      this.contacts[this.avatarActive].messages.push({
        date: this.now,
        text: text,
        status: status
      });
    },

    //milestone 4
    searchUser(){

      const str = this.strSearch.toLowerCase();
      const maxLength = str.length;

      this.contacts.forEach((value)=>{

        const subName = value.name.substring(0, maxLength).toLowerCase();

        //condizione che rende visibile il contatto se il nome inizia con la stringa inserita
        (str === subName) ? value.visible = true : value.visible = false ;
        
      });

      this.strSearch = '';

    },//fine search
    
    lastAccess(index){
      //messaggi dell'utente con index fornito
      let msg = this.contacts[index].messages;
      let recDate = '';

      //ciclo di messaggi, salvo la data di quello ricevuto
      msg.forEach((value)=>{
        if(value.status === 'received') {
          recDate = value.date;
        }; 
      });
      //invio l'ultimo salvato 
      return recDate;
    },

    lastMess(index){
      //visualizzare i primi 30 caratteri del messaggio se maggiore aggiungere '...'
      let msg = this.contacts[index].messages;
      if(msg[msg.length-1].text.length > 30){
        return msg[msg.length-1].text.slice(0,30) + '...';
      }else{
        return msg[msg.length-1].text;
      }

    },

    adesso(){
      this.now = dayjs().format('DD/MM/YYYY HH:mm:ss');
      return this.now
    }

   
  },

  mounted(){
    //console.log("siamo qui");
  }

});
