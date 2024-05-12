<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<template>
  <main class="flex-1 flex flex-col bg-stone-50">
    <twice-ui-page-layout
      title="Einstellungen"
    >
      <template #pivot>
        <twice-ui-pivot>
          <twice-ui-pivot-item
            label="Grundeinstellungen"
            route-name="settings-base"
            active-route-path="/app/settings/base"
          />
          <twice-ui-pivot-item
            label="Betrieb"
            route-name="settings-business"
            active-route-path="/app/settings/business"
          />
          <twice-ui-pivot-item
            disabled
            label="Arbeitsmittel"
            route-name="settings-inventory"
            active-route-path="/app/settings/inventory"
          />
          <twice-ui-pivot-item
            disabled
            label="Technische Prüfungen"
            route-name="settings-checks-categories"
            active-route-path="/app/settings/checks"
          />
          <twice-ui-pivot-item
            label="Unterweisungen"
            route-name="settings-instructions"
            active-route-path="/app/settings/instructions"
          />
        </twice-ui-pivot>
      </template>
      <template #fixed>
        <RouterView />
      </template>
    </twice-ui-page-layout>
  </main>
</template>
