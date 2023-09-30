<script lang="ts">
  import ContactForm from "./ContactForm.svelte";
  import ContactList from "./ContactList.svelte";
</script>

<div class="rom">
  <div class="column"><h1>Contact List</h1></div>
</div>
<ContactForm />
<ContactList />

<style>
  h1 {
    text-align: center;
    margin-top: 20px;
  }
</style>
