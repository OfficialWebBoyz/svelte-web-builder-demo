<script>
  import "../app.css";
</script>

<div>
  <nav class="">
    <div class='flex justify-between px-3 py-2 max-w-7xl m-auto'>
      <a href='/'>Home</a>

      <div class="flex gap-3">
        <a href='/flavors'>Flavors</a>
      </div>
    </div>
  </nav>
  <slot />
</div>