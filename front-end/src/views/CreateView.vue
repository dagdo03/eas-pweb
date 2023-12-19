<template>
    <div>
        <form @submit.prevent="create">
          <div class="form-group">
                <label for="username">Username</label>
                <input v-model="username" type="text" class="form-control" id="username">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="text" class="form-control" id="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="my-3">
                <button type="submit" class="btn btn-primary">
                    Create
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async create() {
      try {
        const req = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.username,
            email: this.email,
            password: this.password,
          }),
        });
        const data = await req.json();
          console.log(data); // Handle the response data as needed
        if (req.ok) {

          // Assuming your API returns a success flag
          // Redirect to another route upon successful login
          this.$router.push('/login'); // Replace '/dashboard' with your desired route
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>