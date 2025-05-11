<template>
    <div
            class="color-circle"
            :style="{ backgroundColor: userData.Color }"
        >
            <span class="initials">{{ initials }}</span>
        </div>
</template>

<script>
export default {
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
    computed: {
      initials() {
        const first = this.userData.FirstName?.[0] || '';
        const last = this.userData.LastName?.[0] || '';
        return (first + last).toUpperCase();
      }
    },
}
</script>

<style scoped>
.color-circle {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    color: white;
    font-weight: bold;
    --circle-size: 100%;
    font-size: calc(0.6 * var(--circle-size));
    margin: 1rem;
    transition: filter 0.3s ease;
}
span{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.initials {
  width: 100%;
  height: 100%;
  color: white;
  pointer-events: none;
  letter-spacing: 1px;
  font-family: serif;
  filter: saturate(0%) brightness(150%);
  opacity: 0.4;
  font-size: 60%;
}
</style>