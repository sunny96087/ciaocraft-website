<script setup>
const email = ref('')
const password = ref('')
const passwordVisible = ref(false)
</script>
<template>
  <div class="sign-in w-[560px] mx-auto flex flex-col items-center mt-[100px] p-6">
    <h1 class="mb-6">
      <img src="/assets/images/Logo_Img.png" alt="ciao-craft-logo" />
    </h1>
    <Form class="text-[16px]">
      <div class="box field-box mb-2">
        <label for="email">
          <Icon name="ph:user-light" />
        </label>
        <input
          class="field-box__input"
          type="email"
          name="email"
          v-model="email"
          placeholder="電子信箱*"
        />
      </div>
      <div class="box field-box">
        <label for="">
          <Icon name="carbon:password" />
        </label>
        <input
          class="field-box__input"
          :type="passwordVisible ? 'text' : 'password'"
          name="password"
          v-model="password"
          placeholder="密碼*"
        />
        <button class="ml-5" @click="passwordVisible = !passwordVisible">
          <Icon name="ph:eye-light" />
        </button>
      </div>
      <div class="box text-center flex justify-center my-6 bg-primary text-[#FFFFFF]">
        <button type="submit">登入</button>
      </div>
      <nav class="box justify-center m-2">
        <button>忘記密碼</button>
        <span class="p-2">|</span>
        <button class="text-primary">註冊會員</button>
      </nav>
      <div class="box flex justify-center">
        <button class="text-primary">回上一頁</button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.sign-in {
  box-shadow: 0px 20px 20px 0px #050d1d33;
}
.field-box__input {
  padding-left: 8px;
  width: 80%;
}
.field-box {
  border-radius: 4;
  border: 1px solid #aaaaaa;
}
.box {
  display: flex;
  align-items: center;
  padding-left: 4px;
  height: 42px;
  width: 400px;
}

.field-box__input:focus {
  outline: 0;
}
</style>
