<script lang="ts">
  import contactStore from "./store/contact.store";
  function onEdit(contactId: string | undefined) {
    contactStore.editContact(contactId);
  }
  function onDelete(contactId: string | undefined) {
    contactStore.delete(contactId);
  }
</script>

{#each $contactStore.contacts as contact (contact.id)}
  <div class="row">
    <div class="column">
      Name: {contact.name}
    </div>
    <div class="column">Phone: {contact.phone}</div>
  </div>
  <div class="row">
    <div class="column">{contact.description}</div>
  </div>
  <div class="rom">
    <div class="column">
      <button
        on:click={() => {
          onEdit(contact.id);
        }}
        class="button">Edit</button
      >
      <button
        on:click={() => {
          onDelete(contact.id);
        }}
        class="button">Delete</button
      >
    </div>
  </div>
{/each}
