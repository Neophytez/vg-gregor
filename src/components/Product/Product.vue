<template>
    <div class="d-flex flex-column card align-items-center my-3 p-3">
        <img :src="ProductImage(product.image)" alt="Product image" class="product-image"/>
        <div v-if="sale_proc" class="sale-tag">{{ sale_proc }} %</div>
        <div class="d-flex align-items-center title">{{ product.title }}</div>
        <div class="d-flex justify-content-around price">
            <span :class="{'strike-price': product.sale_price}">{{ product.price }} €</span>
            <span v-if="product.sale_price" class="ms-3 text-danger">{{ product.sale_price }} €</span>
        </div>
        <button class="btn btn-dark" @click="AddToCart(product)">Add to cart</button>
        <button v-if="authenticated" class="btn btn-outline-dark mt-3" @click="EditProduct(product)">Edit</button>
    </div>
</template>

<script>
import {computed, inject} from "vue";

export default {
    name: "Product",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const sale_proc = computed(() => {
            if (!props.product.sale_price || !props.product.price) return null;
            return Math.round(props.product.sale_price / props.product.price * 100 - 100);
        });

        function ProductImage(src) {
            if (src === null) return "images/no_photo_avail.png";
            return src;
        }

        const AddToCart = inject('AddToCart');
        const EditProduct = inject('EditProduct');
        const authenticated = inject('authenticated');

        return {
            ProductImage,
            sale_proc,
            AddToCart,
            EditProduct,
            authenticated
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
    max-width: 100%;
    border: 1px solid rgba(0, 0, 0, .125);
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