<template>
    <div class="d-flex flex-column container align-items-center">
        <div class="col-6 mb-3">
            <h1>CART</h1>
        </div>
        <div v-if="cart.length" class="col-6 mb-3">
            <div class="row header">
                <div class="col-2"></div>
                <div class="col-3"></div>
                <div class="col-3 text-center">Quantity</div>
                <div class="col-2 text-end">Price</div>
                <div class="col-2 text-end">Total</div>
            </div>
        </div>
        <div v-else>
            <h3>Cart is empty.</h3>
        </div>
        <div v-for="product in cart" class="col-6">
            <div class="row align-items-center">
                <div class="col-2 text-center"><img :alt="product.title" :src="ProductImage(product.image)"
                                                    class="product-image"/></div>
                <div class="col-3 title">{{ product.title }}</div>
                <div class="col-3 text-center">
                    <button class="btn btn-sm" @click="DecreaseQuantity(product)"><i class="bi bi-dash"></i></button>
                    {{ product.quantity }}
                    <button class="btn btn-sm" @click="IncreaseQuantity(product)"><i class="bi bi-plus"></i></button>
                </div>
                <div class="col-2 text-end">{{ (product.sale_price ?? product.price).toFixed(2) }} €</div>
                <div class="col-2 text-end">{{ ((product.sale_price ?? product.price) * product.quantity).toFixed(2) }}
                    €
                </div>
            </div>
        </div>
        <div class="col-6">
            <hr/>
        </div>
        <div class="col-6 mb-3 summary">
            <div class="row justify-content-end">
                <div class="col-4 bold">Total without VAT</div>
                <div class="col-3 text-end">{{ totalPrice }} €</div>
            </div>
            <div class="row justify-content-end">
                <div class="col-4 bold">VAT <small>(22%)</small></div>
                <div class="col-3 text-end">{{ DDV }} €</div>
            </div>
            <div class="row justify-content-end">
                <div class="col-4 bold">Total with VAT</div>
                <div class="col-3 text-end">{{ totalPriceDDV }} €</div>
            </div>
        </div>
        <div v-if="cart_quantity" class="d-flex col-6 justify-content-end">
            <button class="btn btn-success" @click="ChangeActiveComponent('Purchase')">Buy</button>
        </div>
    </div>
</template>

<script>
import {computed, inject} from "vue";

export default {
    name: "Cart",
    setup() {
        const cart = inject('cart');
        const ChangeActiveComponent = inject('ChangeActiveComponentSale');

        const totalPriceDDV = computed(() => {
            return cart.value.reduce((prev, cur) => {
                return prev + ((cur.sale_price ?? cur.price) * cur.quantity);
            }, 0).toFixed(2)
        });

        const cart_quantity = computed(() => {
            return cart.value.reduce((prev, cur) => {
                return prev + cur.quantity;
            }, 0);
        });

        const DDV = computed(() => {
            return (totalPriceDDV.value * 0.22).toFixed(2);
        });

        const totalPrice = computed(() => {
            return (totalPriceDDV.value - DDV.value).toFixed(2);
        });

        function DecreaseQuantity(product) {
            if (product.quantity > 1) {
                product.quantity--
            } else {
                let index = cart.value.findIndex(el => el.id === product.id);
                cart.value.splice(index, 1);
            }
        }

        function IncreaseQuantity(product) {
            product.quantity++
        }

        function ProductImage(src) {
            if (src === null) return "images/no_photo_avail.png";
            return src;
        }

        return {
            DDV,
            totalPrice,
            totalPriceDDV,
            DecreaseQuantity,
            IncreaseQuantity,
            ProductImage,
            cart_quantity,
            cart,
            ChangeActiveComponent
        }
    }
}
</script>

<style scoped>
.header, .title {
    font-size: large;
    font-weight: 500;
}

.summary {
    font-weight: 500;
}

.product-image {
    max-height: 50px;
    max-width: 50px;
}
</style>