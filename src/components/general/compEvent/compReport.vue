<template>
    <div class="full-width row justify-around" style="height:35vw">
        <q-form @submit="onSubmit" class="fit q-gutter-md overflow-auto">
            <div class="row no-wrap">
                <q-select dense v-model="report.reason" label="Sebep" filled :options="options" class="full-width" />
                <q-btn dense label="Submit" type="submit" color="primary" class="q-mx-sm" />
            </div>
            <q-input dense v-model="report.explanation" bordered label="Açıklama" type="textarea" />
        </q-form>
    </div>
</template>
<script>
import { reportEvent } from "@/services/app/event"
import { useUser } from "@/store/user";
export default {
    props: ["openSettings", "event"],
    data() {
        return {
            userStore: useUser(),
            report: {
                reason: "",
                explanation: ""
            },
            options: ["Uygunsuz Dçerik", "Dolandırıcılık"],

        }
    },
    methods: {
        onSubmit() {
            reportEvent(this.userStore.uID, this.event.owner.uID, this.event.eID, this.report).then(() => this.openSettings())
        }
    }
}
</script>