<template>
  <div class="flex-1 flex space-x-4">
    <div class="flex-none w-1/5 mt-14 space-y-3">
      <twice-ui-nav-group>
        <twice-ui-nav-item
          disabled
          badge-animate
          :badge-count="0"
          badge-color="green"
          label="Unterweisungen"
          icon="tabler-user-screen"
          route-name="settings-instructions-safety-instructions"
          active-route-path="/app/settings/instructions/safety-instructions"
        />
      </twice-ui-nav-group>
      <twice-ui-nav-group>
        <twice-ui-nav-item
          badge-animate
          :badge-count="0"
          badge-color="green"
          label="Betriebsanweisungen"
          icon="tabler-notes"
          route-name="settings-instructions-operating-instructions"
          active-route-path="/app/settings/instructions/operating-instructions"
        />
        <twice-ui-nav-item
          badge-animate
          :badge-count="0"
          badge-color="green"
          label="Kategorien"
          icon="tabler-category"
          route-name="settings-instructions-safety-categories"
          active-route-path="/app/settings/instructions/safety-categories"
        />
      </twice-ui-nav-group>
    </div>
    <div class="overflow-hidden flex-1 flex">
      <RouterView />
    </div>
  </div>
</template>
