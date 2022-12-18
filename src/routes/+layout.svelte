<script>
  import "../app.css";
</script>

<div class="prose prose-cyan max-w-none">
  <nav class="">
    <div class='flex justify-between py-2 x-container'>
      <a href='/'>Home</a>

      <div class="flex gap-3">
        <a href='/flavors'>Flavors</a>
      </div>
    </div>
  </nav>
  <slot />

  <footer>
    <div class="x-container flex justify-center">
      <blockquote>
        Come buy our ice cream and shove it down your throat ;&#41; 
      </blockquote>
    </div>
  </footer>
</div>