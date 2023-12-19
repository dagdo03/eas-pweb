<template>
    <form  @submit.prevent="sendChat">
        <div>
            <input v-model="chatText" type="text" class="form-control" id="chatText"><button>Kirim</button>
        </div>
    </form>
    <br>
    <div>
      <p>Chats:</p>
      <div v-for="chatGroup in chats" :key="chatGroup[0].id">
        <div v-for="item in chatGroup" :key="item.id">
            <h5 v-if="item.author.id === this.sender.user.id && item.receiver.id === this.$route.params.userId || item.author.id === this.$route.params.userId && item.receiver.id === this.sender.user.id">{{ item.author.name }} <h6>{{ item.author.createdAt }}</h6> :</h5>
            <h5 v-if="item.author.id === this.sender.user.id && item.receiver.id === this.$route.params.userId || item.author.id === this.$route.params.userId && item.receiver.id === this.sender.user.id">{{ item.message }}</h5>
        </div>
      </div>
  </div>
</template>

<script>
    export default{
        data() {
            return {
                chats: [],
                chatText: '',
                sender: '',
            };
        },
        created(){
            this.getChat(),
            this.getSender()
        },
        methods: {
            async sendChat(){
                try {
                    const userReq = await fetch('http://localhost:3000/api/users/me', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                },
                });
                // const receiverReq = await fetch('http://localhost:3000/api/channels/' + this.$route.params.userId, {
                //     method: 'GET',
                //     credentials: 'include',
                //     headers: {
                //         'Content-Type': 'application/json',
                // },
                // });

                const userData = await userReq.json();
                this.sender = userData;
                console.log(this.sender);
                // const channelData = await receiverReq.json() 
                // console.log(channelData);
                const authorId = userData.user.id;
                console.log(authorId);
                // const chId = channelData.id
                // console.log(chId);
                const req = await fetch('http://localhost:3000/api/privatechats', {
                method: 'POST',
                credentials: 'include',
                headers: {
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                author: authorId,
                message: this.chatText,
                receiver: this.$route.params.userId
                }),
        });

                const data = await req.json();
                if (req.ok) {
                    console.log(data);
                }
        
            } catch (err) {
                    console.log(err);
                }
        },
        async getSender(){
            try {
                    const req = await fetch('http://localhost:3000/api/users/me', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                },
                });
                const data = await req.json();
                this.sender = data
                console.log(this.sender)
        } catch (err){
            console.log(err)
        }
        },
        async getChat(){
        try {
                const req = await fetch('http://localhost:3000/api/privatechats', {
                method: 'GET',
                credentials: 'include',
                headers: {
                        'Content-Type': 'application/json',
                },
            });
            const data = await req.json();
            this.chats.push(data.docs);
            console.log(this.chats)
            }
            catch (err){
                console.log(err);
            }
        }
    }
}
</script>