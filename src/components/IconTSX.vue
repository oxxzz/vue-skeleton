<script lang="tsx">
import { compile, defineComponent, h } from 'vue'

export default defineComponent({
  name: 'IconTSX',
  props: {
    icon: {
      type: String,
      required: true
    }
  },

  setup(props) {
    return () => h(compile(`${props.icon}`))
  }
})
</script>
