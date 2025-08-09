---
title: blog
layout: blog
permalink: /blog/
---

<section class="bg-devonus-black">
  <div class="sm:h-40"></div>
  <div class="mx-auto max-w-7xl items-center p-6 lg:px-8">
    <div class="sm:flex justify-between text-white">
      <div class="uppercase font-humane font-extralight text-7xl tracking-wide">
        <h1 class="text-7xl text-white leading-none -mb-2">Day #1</h1>
        <h1 class="leading-none -mb-2">Blog</h1>
      </div>
      <div>
        <p class="max-w-lg mx-auto text-white">
          Welcome to the Devonus Blog where we share insights on web
          development, design, and digital strategy to help your business
          thrive online.
        </p>
        <div class="grid grid-cols-2 grid-rows-2 mt-4">
          <div>Location:</div>
          <div>Date:</div>
          <div>San Diego, CA</div>
          <div>{{ site.time | date: "%B %d, %Y" }}</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <img
      src="https://res.cloudinary.com/dvufsifir/image/upload/v1754765643/woods_eeozyg.webp"
      class="h-80 w-auto object-cover sm:h-auto sm:w-full"
      alt="Woods"
    />
  </div>

  <!-- show first post -->
  {% assign first_post = site.posts.first %}
  {% if first_post %}
    <div class="relative h-full mx-auto max-w-2xl p-6 lg:px-8">
      <div class="text-white uppercase font-extralight text-2xl pt-10">
        <h1 class="text-6xl font-humane font-extralight">
          {{ first_post.title }}
        </h1>
        <h1>Blog</h1>
      </div>
      <div class="grid text-white py-5 text-sm gap-4">
        <p class="">{{ first_post.content }}</p>
      </div>
    </div>
  {% endif %}
</section>
