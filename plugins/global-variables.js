const global = {
    ihs: 'https://aleafwolf.github.io/IHS/TOT/'
  }
  
  export default ({ app }, inject) => {
    inject('globalV', global)
  }