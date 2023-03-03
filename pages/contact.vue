<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full">
    <div>
      <a-form id="contact-form" :form="form" @submit="onSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: $t('CONTACT.NAME-NOTICE'),
                  },
                ],
              },
            ]"
            :placeholder="$t('CONTACT.NAME')"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    pattern: $globalV.emailRegex,
                    message: $t('CONTACT.EMAIL-NOTICE'),
                  },
                ],
              },
            ]"
            :placeholder="$t('CONTACT.EMAIL')"
          />
        </a-form-item>
        <a-form-item>
          <a-textarea
            v-decorator="['comment']"
            :auto-size="{ minRows: 3, maxRows: 10 }"
            :placeholder="$t('CONTACT.MESSAGE-NOTE')"
          />
        </a-form-item>
        <a-button type="primary" html-type="submit" class="contact-submit-btn">
          {{ isSubmitting ? $t("CONTACT.SENDING") : $t("CONTACT.SEND") }}
        </a-button>
      </a-form>
      <h4 class="mt-2" v-if="isSuccess">{{ $t("CONTACT.SUCCESS-MESSAGE") }}</h4>
    </div>
    <div class="order-first lg:order-last">
      <h4 class="text-center">{{ $t("CONTACT.NOTE") }}</h4>
      <img class="davis mx-auto" src="~assets/images/初代.png" alt="初代" />
    </div>
    <LoadingMask :isShow="isSubmitting" />
  </section>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      isSubmitting: false,
      isSuccess: false,
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
          this.isSubmitting = true;
          this.$axios
            .$post("/api/contacts", {
              data: values,
            })
            .then((res) => {
              this.form.resetFields();
              this.isSubmitting = false;
              this.isSuccess = true;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  head() {
    return {
      title: `${this.$t("NAV.CONTACT")} | ${this.$t("COMMON.TITLE-POSTFIX")}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.$t("NAV.CONTACT")} | ${this.$t(
            "COMMON.TITLE-POSTFIX"
          )}`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
form > div {
  display: flex;
  flex-direction: column;
}
.davis {
  max-height: 250px;
}
</style>
