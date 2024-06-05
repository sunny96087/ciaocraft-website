<
<script>
export default {
  // get query string from URL
  mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const user = urlParams.get('user')
    if (user) {
      localStorage.setItem('token', user)
    }

    // redirect to home page
    if (localStorage.getItem('token')) {
      this.$router.push('/')
    }
  }
}
</script>
>
