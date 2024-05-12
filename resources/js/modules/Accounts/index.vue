<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/shdn/ui/breadcrumb'

</script>
<template>
  <twice-ui-page-layout title="Accounts">
    <template #breadcrumbs>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Accounts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </template>
    <template #header-toolbar>
      <shdn-ui-button>
        Account hinzufügen
      </shdn-ui-button>
    </template>
    <template #content-full>
      <div class="px-0.5">
        <twice-ui-table-box
          :record-count="0"
          record-name="Accounts"
        />
      </div>
    </template>
  </twice-ui-page-layout>
</template>
