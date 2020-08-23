var app = new Vue({
    el: '#app',
    data: {
      name: '',
      text: '',
      messages: [],
      chatStarted: false,
    },
    methods: {
      enter() {
        if(this.name === '') {
          return;
        }
  
        this.socket = io(window.location.href);
  
        this.socket.on('message', (text) => {
          this.messages.push({ text, type: 'receive' });
        });
  
        this.socket.on('new-user', user => {
          this.messages.push({ user, type: 'new-user' });
        });
  
        this.socket.emit('new-user', this.name);
        this.chatStarted = true;
      },
      sendText() {
        this.socket.emit('message', this.text);
        this.socket.emit('message', this.name);
        this.messages.push({ text: this.text, type: 'send' });
        //this.messages.push({ name: this.name, type: 'send' });
        this.text = '';
        
      }
    }
  });