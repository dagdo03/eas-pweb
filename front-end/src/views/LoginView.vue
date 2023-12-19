<template>
    <div>
        <form @submit.prevent="login">
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
                    Login
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const req = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        const data = await req.json();
        console.log(data); // Handle the response data as needed
        // Assuming your API returns a success flag
        if (req.status == 200) {
          // Redirect to another route upon successful login
          this.$router.push('/dashboard'); // Replace '/dashboard' with your desired route
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>