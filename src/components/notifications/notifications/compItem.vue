<template>
    <q-item clickable v-ripple @click="onClick">
        <q-item-section avatar>
            <q-avatar v-if="notification.data.notification.uPhotoURL">
                <img :src="notification.data.notification.uPhotoURL" alt="">
            </q-avatar>
            <q-avatar v-else-if="notification.data.notification.ePhotoURL">
                <img :src="notification.data.notification.ePhotoURL" alt="">
            </q-avatar>
            <q-icon v-else color="primary" name="info" />
        </q-item-section>

        <q-item-section> {{ text }}</q-item-section>

        <q-item-section avatar>
            <q-icon color="primary" name="arrow_forward_ios" />
        </q-item-section>
    </q-item>
</template>

<script>
import { useNotifications } from '@/store/notifications';
export default {
    props: ["notification"],
    inject:["changeSlide"],
    data() {
        return {
            notificationsStore: useNotifications()
        }
    },
    methods: {
        onClick() {
            this.notificationsStore.notification = this.notification;
            this.changeSlide();
        }
    },
    computed: {
        text() {
            if (this.notification.data.notification.type == "request") return "Katılım Onay"
            else if (this.notification.data.notification.type == "near") return "Yaklaşan Etkinlik Var :)"
            else if (this.notification.data.notification.type == "start") return "Etkinlik Başladı :)"
            else if (this.notification.data.notification.type == "end") return "Etkinlik Bitti :)"
            return ""
        }
    }
}
</script>