<template>
  <div class='loginInput'>
    <input :type="type == 'number'?'text':type" :placeholder="placeholder" :maxlength="maxlength" :minlength="maxlength" v-model="currentValue"
      @keydown="keydown" :class='{width160:hasBtn}' />
    <div class='prend' v-if='hasBtn'>
      <slot name="prend">
      </slot>
    </div>
    <div class='_tips' v-if='tip' v-text='tip'></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentValue: ""
      }
    },
    props: {
      'placeholder': String,
      'value': String,
      'maxlength': String,
      'minlength': String,
      type: {
        type: String,
        default: 'text'
      },
      'hasBtn': String,
      'tip': String
    },
    components: {},
    methods: {
      keydown(e) {
        if (this.type == 'number') {
          let iKeyCode = e.keyCode || e.which;
          if (!((iKeyCode >= 48) && (iKeyCode <= 57) || (iKeyCode >= 96) && (iKeyCode <=
              105) || (iKeyCode >= 37) && (
              iKeyCode <= 40) || iKeyCode === 8 || iKeyCode == 46)) {
            if (window.event) {
              event.returnValue = false;
            } else {
              e.preventDefault();
            }
          }
        }
      }
    },
    mounted() {
      this.currentValue = this.value
    },
    destroyed() {},
    watch: {
      currentValue(val) {
        this.$emit('input', val);
      }
    },
  };
</script>
<style scoped lang="scss">
  .loginInput {
    position: relative;
    width: 280px;
    height: 20px;
    padding: 5px 10px;
    border-bottom: 1px solid #c8c8c8;

    ._tips {
      position: absolute;
      left: 10px;
      bottom: -20px;
      color: #c8c8c8;
      font-size: 12px;
    }
    .prend {
      position: absolute;
      right: 0px;
      top: 0px;
      width: 100px;
      height: 20px;
      padding: 5px 10px;
    }
    input[type="text"],
    textarea {
      -webkit-appearance: none;
      outline: none;
    }
    input {
      font-size: 14px;
      line-height: 20px;
      display: block;
      width: 280px;
      border: none;
      outline: none;
      &.width160 {
        width: 160px;

      }
      &::focus {
        border: none;
        outline: none;
      }
      input::-webkit-input-placeholder {
        color: #999999;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999999;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #999999;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999999;
      }
    }
  }
</style>