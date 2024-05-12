<script lang="ts" setup>
import { Button } from '@/components/shdn/ui/button'
import { reactive } from 'vue'

const form = reactive({})

</script>
<template>
  <twice-ui-form :initial-values="form">
    <twice-ui-form-section headline="Prüfkategorie bearbeiten">
      <template #form>
        <twice-ui-form-group>
          <div class="col-span-12">
            <twice-ui-input
              name="name"
              label="Bezeichnung"
              rules="required"
            />
          </div>
        </twice-ui-form-group>
      </template>
      <template #actions>
        <Button variant="secondary">
          Abbrechen
        </Button>
        <Button>Speichern</Button>
      </template>
    </twice-ui-form-section>
  </twice-ui-form>
</template>
