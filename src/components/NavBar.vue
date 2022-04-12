<template>
    <!-- START HERE -->
    <div class="d-flex flex-row row-hl justify-content-between px-2">
        <div class="">
            <img src="../assets/airportlogo.png" class="logo mt-1" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'Navbar',
    components: {
    },
}
</script>

<style scoped>
.row-hl {
    background-image: url('../assets/header.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 50px;
    color: #fff;
}
.logo {
    height: 32px;
    width: 160px;
    /* 569 116 */
}

</style>
