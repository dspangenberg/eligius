<script setup lang="ts">
import { computed, toRef } from 'vue'
import { id as id2 } from 'random-html-id'
import { useField } from 'vee-validate'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shdn/ui/select'

export interface Options {
  id: string
  name: string
  disabled?: boolean
  group?: string
}

export interface Props {
  name: string
  rules?: string
  label?: string
  placeholder?: string
  id?: string
  empty?: boolean
  disabled?: boolean
  autofocus?: boolean
  required?: boolean
  options: Options[]
  selectClass?: string
  onlyOptionsWithName?: boolean
  placeholderValue?: number | string | null
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  rules: undefined,
  label: undefined,
  placeholder: '(auswählen)',
  selectClass: '',
  disabled: false,
  optionsValue: 'id',
  optionsName: 'name',
  optionDisabled: 'disabled',
  onlyOptionsWithName: false,
  placeholderValue: 0,
  empty: false,
  autofocus: false,
  required: false
})

const name = toRef(props, 'name')
const rules = toRef(props, 'rules')
const label = toRef(props, 'label')

const xid = id2()
const htmlId = computed(() => `select-${xid}`)

const { value } = useField<string>(name, rules, { label })

</script>
<template>
  <div class="p-0 m-0 bg-transparent border-0">
    <twice-ui-label
      :label="label"
      :required="required"
      :for="htmlId"
    />
    <Select
      v-model="value"
    >
      <SelectTrigger
        :id="htmlId"
        :autofocus="autofocus"
      >
        <SelectValue
          :placeholder="placeholder"
          :class="selectClass"
        />
      </SelectTrigger>

      <SelectContent
        :class="selectClass"
      >
        <SelectGroup>
          <SelectItem
            v-for="(item, index) in options"
            :key="index"
            :value="item['id']"
            class="text-sm"
            :group="item.group"
            :selected="item['id'] === value"
          >
            {{ item['name'] }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
