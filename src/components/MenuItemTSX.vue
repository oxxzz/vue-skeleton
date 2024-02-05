<script lang="tsx">
import { type Permission } from '@/types/model'
import { MenuItem, SubMenu } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import IconTSX from './IconTSX.vue'

export default defineComponent({
  name: 'MenuItemTSX',
  props: {
    items: {
      type: Array<Permission>,
      required: true
    }
  },
  setup(props) {
    return () => () => {
      function build(items: Permission[], nodes = []) {
        items.forEach((item) => {
          const icon = item.icon ? <IconTSX icon={item.icon || ''} /> : null
          const node = item.children?.length ? (
            <SubMenu key={item.uuid} v-slots={{ icon, title: item.name }}>
              {build(item.children)}
            </SubMenu>
          ) : (
            <MenuItem key={item.uuid} v-slots={{ icon, title: item.name }} />
          )

          nodes.push(node as never)
        })

        return nodes
      }

      return build(props.items)
    }
  }
})
</script>
