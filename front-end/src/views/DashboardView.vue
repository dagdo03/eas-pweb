<template>
  <div>
    <div class="my-3">
      <button @click="logout" class="btn btn-primary">
        Logout
      </button>
    </div>

    <!-- <form @submit.prevent="createChannel">
      <div class="form-group">
        <input v-model="channelName" type="text" class="form-control" id="channelName" />
        <button class="btn btn-success">
          Create Channel
        </button>
      </div>
    </form> -->
    <div>
      <p>Hi {{ this.user.user.name }} </p>
      <p>List Friends:</p>
      <div v-for="usersGroup in users" :key="usersGroup[0].id">
        <div v-for="item in usersGroup" :key="item.id">
          <router-link :to="{name: 'chats', params:{userId:item.id}}">
            <h5 v-if="item.id != this.user.user.id">{{ item.name }}</h5>
          </router-link>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      channelName: '',
      user: ''
    };
  },
  created() {
    this.getUsers(),
    this.getUser();
  },
  methods: {
    async logout() {
      try {
        const req = await fetch('http://localhost:3000/api/users/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await req.json();
        console.log(data);

        if (req.ok) {
          this.$router.push('/login');
        }
      } catch (err) {
        console.log(err);
      }
    },
    // async createChannel() {
    //   try {
    //     this.loading = true;
    //     const userReq = await fetch('http://localhost:3000/api/users/me', {
    //       method: 'GET',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }, 
    //     });

    //     const userData = await userReq.json();
    //     // const authorId = userData.user.id;

    //     // const req = await fetch('http://localhost:3000/api/channels', {
    //     //   method: 'POST',
    //     //   credentials: 'include',
    //     //   headers: {
    //     //     'Content-Type': 'application/json',
    //     //   },
    //     //   body: JSON.stringify({
    //     //     author: authorId,
    //     //     channel: this.channelName,
    //     //   }),
    //     // });

    //     // const data = await req.json();
    //     // if (req.ok) {
    //     //   console.log(data);
    //     // }
        
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async getUsers() {
      try {
        const req = await fetch('http://localhost:3000/api/users', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await req.json();
        // console.log(data);
        this.users.push(data.docs);
        console.log(this.users);
      } catch (err) {
        console.log(err);

      }
    },
    async getUser() {
      try {
        const req = await fetch('http://localhost:3000/api/users/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await req.json();
        // console.log(data);
        if(req.ok){
          this.user = data;
          console.log(this.user);
        }
        else if(req.status === 403){
          this.$router.push('/login');
        }
        
      } catch (err) {
        console.log(err);
      }
    },
    // async getUsersId(){
    //         try {
    //     const req = await fetch('http://localhost:3000/api/channels/' + this.$route.params.userId, {
    //       method: 'GET',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });

    //     const data = await req.json();
    //     console.log(data);
    //     console.log(this.servers);
    //   } catch (err) {
    //     console.log(err);
    //   }
    //     }
  },
};
</script>
