<template>
  <section>
    <div><h1 class="text-xl">Fill the form here</h1></div>
    <a-form id="contact-form" :form="form" @submit="onSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ],
            },
          ]"
          placeholder="Name"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                { required: true, message: 'Please input your Email!' },
                {
                  pattern: $globalV.emailRegex,
                  message: 'Please input Email in validated form',
                },
              ],
            },
          ]"
          placeholder="Email"
        />
      </a-form-item>
      <a-form-item>
        <a-textarea
          v-decorator="['comment']"
          :auto-size="{ minRows: 3, maxRows: 8 }"
          placeholder="Comment"
        />
      </a-form-item>
      <a-button type="primary" html-type="submit" class="contact-submit-btn">
        {{ isSubmitting ? "SENDING" : "SEND" }}
      </a-button>
    </a-form>
  </section>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      isSubmitting: false,
      formFields: {
        name: "",
        email: "",
        comment: "",
      },
      form: this.$form.createForm(this, { name: "contact-form" }),
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios
            .$post("/api/contacts", {
              data: values,
            })
            .then((res) => console.log(res))
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form > div {
  display: flex;
  flex-direction: column;
}
</style>
