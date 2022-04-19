<template>
    <div class="d-flex flex-column card align-items-center my-3 p-3">
        <img :src="productImage(product.image)" alt="Product image" class="product-image"/>
        <div v-if="sale_proc" class="sale-tag">{{sale_proc}} %</div>
        <div class="d-flex align-items-center title">{{ productTitle(product.title) }}</div>
        <div class="d-flex justify-content-around price">
            <span :class="{'strike-price': product.sale_price}">{{ product.price }} €</span>
            <span v-if="product.sale_price" class="ms-3 text-danger">{{ product.sale_price }} €</span>
        </div>
        <button class="btn btn-dark" @click="$emit('addToCart', product)">Add to cart</button>
    </div>
</template>

<script>
import {computed} from "vue";

export default {
    name: "Product",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    emits: ['addToCart'],
    setup(props, context) {
        const sale_proc = computed(() => {
            if(!props.product.sale_price || !props.product.price) return null;

            return Math.round(props.product.sale_price / props.product.price * 100 - 100);
        });

        function productImage(src) {
            if(src === null) return "images/no_photo_avail.png";
            return src;
        }

        function productTitle(title) {
            return title.replace(/['"]+/g, '');
        }

        return {
            productImage,
            productTitle,
            sale_proc,
        }
    }
}
</script>

<style scoped>
.strike-price {
    text-decoration: line-through;
}

.product-image {
    max-height: 200px;
    max-width: 200px;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.25rem;
}

.card .title {
    min-height: 100px;
    text-align: center;
    font-size: large;
    font-weight: 500;
}

.card .price {
    text-align: center;
    font-weight: 600;
    margin-bottom: 1rem;
}

.sale-tag {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    border-radius: 2px;
    background-color: #dc3545;
    color: white;
    font-weight: 600;
}
</style>