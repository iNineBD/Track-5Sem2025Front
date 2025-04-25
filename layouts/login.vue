<template>
  <div class="login-layout">
    <div class="left-side">
      <div class="blue-background"></div>
    </div>
    <div class="right-side">
      <div class="logo-container">
        <NuxtImg
          src="/logo-black.svg"
          alt="Logo"
          class="h-6 block dark:hidden"
        />
        <NuxtImg
          src="/logo-white.svg"
          alt="Logo"
          class="h-6 hidden dark:block"
        />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-layout {
  display: flex;
  height: 100vh;
  flex-direction: row;
}

.left-side {
  width: 60%;
  background-color: rgba(140, 18, 255, 0.781);
}

.right-side {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow-y: auto;
}

.logo-container {
  position: absolute;
  top: 2rem;
  left: 2rem;
}

.logo {
  height: 3rem;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem; /* default base size */
  width: 100%;
}

/* Responsive behavior */
@media (max-width: 1024px) {
  .login-layout {
    flex-direction: column;
  }

  .left-side {
    display: none;
  }

  .right-side {
    width: 100%;
    padding: 3rem 2rem;
  }

  .logo-container {
    position: static;
    margin-bottom: 2rem;
    align-self: flex-start;
  }

  .content {
    font-size: 1.5rem;
  }
}

@media (max-width: 640px) {
  .content {
    font-size: 1.125rem;
  }

  .logo {
    height: 2.5rem;
  }
}
</style>
