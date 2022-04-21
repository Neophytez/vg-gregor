<template>
    <div class="d-flex flex-column container align-items-center">
        <div class="col-6 mb-3">
            <h1>PURCHASE</h1>
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
        <div v-for="product in cart"  class="col-6">
            <div class="row align-items-center">
                <div class="col-2 text-center"><img :src="ProductImage(product.image)" class="product-image" :alt="product.title"/></div>
                <div class="col-3 title">{{ product.title }}</div>
                <div class="col-3 text-center">
                    {{ product.quantity }}
                </div>
                <div class="col-2 text-end">{{ (product.sale_price ?? product.price).toFixed(2) }} €</div>
                <div class="col-2 text-end">{{ ((product.sale_price ?? product.price) * product.quantity).toFixed(2) }} €</div>
            </div>
        </div>
        <div class="col-6">
            <hr/>
        </div>
        <div class="col-6 mb-5 summary">
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
        <div class="col-8 mb-3">
            <h3>DELIVERY INFORMATION</h3>
        </div>
        <div class="row col-8 mb-3">
            <div class="col-5">
                <label>First name</label>
                <input type="text" class="form-control" v-model="customer.first_name">

                <label>Last name</label>
                <input type="text" class="form-control" v-model="customer.last_name">

                <label>Address</label>
                <input type="text" class="form-control" v-model="customer.address">

                <label>Postal number</label>
                <input type="number" class="form-control" v-model="customer.postal_number">

                <label>Post</label>
                <input type="text" class="form-control" v-model="customer.post">

                <label>E-mail</label>
                <input type="email" class="form-control" v-model="customer.email">
            </div>
            <div class="col-7">
                <div class="card p-3 mb-3">
                    <p>Payment: COD</p>
                    <p>Delivery: Pošta Slovenije</p>
                    <div class="card p-3 bg-dark text-light">
                        <p>{{customer.first_name}} {{customer.last_name}}</p>
                        <p>{{customer.address}}</p>
                        <p>{{customer.postal_number}} {{customer.post}}</p>
                        <p>{{customer.email}}</p>
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-dark">Submit order</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, inject, ref} from "vue";

export default {
    name: "Purchase",
    setup() {
        const cart = inject('cart');

        const customer = ref({
            first_name: null,
            last_name: null,
            address: null,
            postal_number: null,
            post: null,
            email: null
        });

        const totalPriceDDV = computed(() => {
            return cart.value.reduce((prev, cur) => {
                return prev + ((cur.sale_price ?? cur.price) * cur.quantity);
            }, 0).toFixed(2)
        });

        const DDV = computed(() => {
            return (totalPriceDDV.value * 0.22).toFixed(2);
        });

        const totalPrice = computed(() => {
            return (totalPriceDDV.value - DDV.value).toFixed(2);
        });


        function DecreaseQuantity(product) {
            if(product.quantity > 0) product.quantity--
        }

        function IncreaseQuantity(product) {
            product.quantity++
        }

        function ProductImage(src) {
            if(src === null) return "images/no_photo_avail.png";
            return src;
        }

        return {
            DDV,
            totalPrice,
            totalPriceDDV,
            DecreaseQuantity,
            IncreaseQuantity,
            ProductImage,
            cart,
            customer
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