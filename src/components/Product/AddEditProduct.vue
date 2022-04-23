<template>
    <div class="d-flex flex-column container align-items-center">
        <div class="col-6">
            <h1>{{ action.toUpperCase() }} PRODUCT</h1>
        </div>
        <div class="col-6 mb-3">
            <label>Product name</label>
            <input type="text" class="form-control" v-model="product.title">
        </div>
        <div v-if="photo_url" class="d-flex col-6 justify-content-center">
            <img class="p-3 w-50" :src="photo_url" alt="Product photo"/>
        </div>
        <div class="d-flex col-6 justify-content-center">
            <label class="btn btn-outline-dark">
                <i class="bi bi-image"></i> Add product photo<input type="file" style="display: none;" name="image" accept="image/png, image/jpeg" @change="PreviewPhoto">
            </label>
        </div>
        <div class="col-6 mb-3">
            <label>Price</label>
            <input type="number" class="form-control" v-model="product.price">
        </div>
        <div class="col-6 mb-3">
            <label>Sale price</label>
            <input type="number" class="form-control" v-model="product.sale_price">
        </div>
        <div class="col-6 mb-3">
            <label>Stock</label>
            <select class="form-select" v-model="product.stock">
                <option :value="true">In stock</option>
                <option :value="false">Out of stock</option>
            </select>
        </div>
        <div class="col-6 mb-3">
            <label>Media type</label>
            <select class="form-select" v-model="product.media_type">
                <option value="dvd">DVD</option>
                <option value="bluray">Bluray</option>
                <option value="vhs">VHS</option>
            </select>
        </div>
        <div class="col-6 mb-3">
            <label>IMDB link</label>
            <input type="text" class="form-control" v-model="product.imdb_link">
        </div>
        <div class="d-flex col-6 justify-content-between">
            <button :disabled="disabled_save" class="btn btn-success" @click="SaveProduct"><i class="bi bi-check"></i> Save</button>
            <button v-if="action === 'edit'" class="btn btn-danger" @click="DeleteProduct(product.id)"><i class="bi bi-trash3"></i> Delete</button>
        </div>
    </div>
</template>

<script>
import {ref, computed, inject, watch} from "vue";

export default {
    name: "AddEditProduct",
    props: {
        product: {
            type: Object,
            default: null
        }
    },
    setup(props) {
        const product = ref(props.product ? {...props.product} : {
            id: null,
            title: null,
            photo: null,
            price: null,
            sale_price: null,
            stock: null,
            media_type: null,
            imdb_link: null
        });

        const action = computed(() => {
            return props.product === null ? "add" : "edit";
        })

        const photo_url = ref(null);

        const disabled_save = computed(() => {
            return !product.value.title || !product.value.price || !product.value.price || !product.value.stock || !product.value.media_type;
        })

        watch(() => props.product, (newVal) => {
            if(!newVal) product.value = {
                id: null,
                title: null,
                photo: null,
                price: null,
                sale_price: null,
                stock: null,
                media_type: null,
                imdb_link: null
            };
        });

        function PreviewPhoto(event) {
            const file = event.target.files[0];
            product.value.photo = file;
            photo_url.value = URL.createObjectURL(file);
        }

        function SaveProduct() {
            if(product.value.id) {
                UpdateProduct(product.value);
            } else {
                CreateProduct(product.value);
            }
        }

        const DeleteProduct = inject('DeleteProduct');
        const CreateProduct = inject('CreateProduct');
        const UpdateProduct = inject('UpdateProduct');

        return {
            product,
            photo_url,
            PreviewPhoto,
            DeleteProduct,
            disabled_save,
            action,
            SaveProduct
        }
    }
}
</script>

<style scoped>

</style>