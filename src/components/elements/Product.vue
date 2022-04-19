<template>
    <div class="d-flex flex-column card align-items-center my-3 p-3">
        <img :src="productImage(product.image)" alt="Product image" class="product-image"/>
        <div class="d-flex align-items-center title">{{ productTitle(product.title) }}</div>
        <div class="d-flex justify-content-around price">
            <span :class="{'strike-price': product.sale_price}">{{ product.price }} €</span>
            <span v-if="product.sale_price" class="ms-3 text-danger">{{ product.sale_price }} €</span>
        </div>
        <button class="btn btn-dark">Add to cart</button>
    </div>
</template>

<script>
export default {
    name: "Product",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        function productImage(src) {
            if(src === null) return "images/no_photo_avail.png";
            return src;
        }

        function productTitle(title) {
            return title.replace(/['"]+/g, '');
        }

        return {
            productImage,
            productTitle
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
</style>