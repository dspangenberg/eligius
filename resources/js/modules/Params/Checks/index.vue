<template>
  <div class="flex-1 flex space-x-4">
    <div class="flex-none w-1/5 mt-14">
      <twice-ui-nav-group>
        <twice-ui-nav-item
          badge-animate
          :badge-count="0"
          badge-color="green"
          label="Prüfverfahren"
          icon="tabler-progress-check"
          route-name="settings-checks-categories"
          active-route-path="app/settings/checks/check-categories"
        />
        <twice-ui-nav-item
          badge-animate
          :badge-count="0"
          badge-color="green"
          label="Prüfarten"
          icon="tabler-progress-check"
          route-name="settings-checks-categories"
          active-route-path="app/settings/checks/check-categories"
        />
        <twice-ui-nav-item
          badge-animate
          :badge-count="0"
          badge-color="green"
          label="Prüfstellen + Sachkundige"
          icon="tabler-user-check"
          route-name="settings-checks-categories"
          active-route-path="app/settings/checks/check-categories"
        />
        <twice-ui-nav-item
          badge-animate
          :badge-count="0"
          badge-color="green"
          label="Fachkundige Beschäftigte"
          icon="tabler-user-check"
          route-name="settings-checks-categories"
          active-route-path="app/settings/checks/check-categories"
        />
      </twice-ui-nav-group>
    </div>
    <div class="overflow-hidden flex-1">
      <RouterView />
    </div>
  </div>
</template>
