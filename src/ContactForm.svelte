<script lang="ts">
  import { onDestroy } from "svelte";
  import contactStore from "./store/contact.store";
  let name: string | undefined = "";
  let phone: string | undefined = "";
  let description: string | undefined = "";
  $: title = $contactStore.editId ? "Edit Contact" : "Add Contact";
  function handleSubmit() {
    if ($contactStore.editId === undefined) {
      contactStore.add(name, phone, description);
    } else {
      contactStore.edit($contactStore.editId, name, phone, description);
    }
    name = "";
    phone = "";
    description = "";
  }

  const unsub = contactStore.subscribe(({ contacts, editId }) => {
    if (!editId) return;
    const contact = contacts.find((contact) => contact.id === editId);
    name = contact?.name;
    phone = contact?.phone;
    description = contact?.description;
  });

  onDestroy(() => {
    unsub();
  });
</script>

<div class="row">
  <div class="column"><h3>{title}</h3></div>
</div>
<div class="row">
  <div class="column">
    <form on:submit|preventDefault={handleSubmit}>
      <fieldset>
        <label for="nameField">Name</label>
        <input
          type="text"
          placeholder="Hussein Talal"
          id="nameField"
          bind:value={name}
        />
        <label for="nameField">Phone</label>
        <input
          type="text"
          placeholder="+966 50 414 5334"
          id="phoneField"
          bind:value={phone}
        />
        <label for="commentField">Description</label>
        <textarea
          placeholder="Hi Hussein …"
          id="commentField"
          bind:value={description}
        />

        <input class="button-primary" type="submit" value={title} />
      </fieldset>
    </form>
  </div>
</div>
