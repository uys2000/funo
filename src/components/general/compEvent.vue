<template>
    <div v-if="show" class="event full-width text-black q-mb-md">
        <comp-header :event="event" :icon="icon" :openSettings="openSettings" />
        <q-carousel keep-alive v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated
            class="bg-secondary" style="height: min-content;">
            <q-carousel-slide name="event" class="full-width" style="height: min-content;">
                <comp-body :event="event" />
            </q-carousel-slide>
            <q-carousel-slide name="settings" class="full-width overflow-hidden" style="height: min-content;">
                <comp-settings :event="event" :openReport="openReport" />
            </q-carousel-slide>
            <q-carousel-slide name="report" class="full-width overflow-hidden" style="height: min-content;">
                <comp-report :event="event" :openSettings="openSettings" :openReport="openReport" />
            </q-carousel-slide>
        </q-carousel>
        <comp-footer :event="event" />
    </div>
</template>
<script>
import compHeader from './compEvent/compHeader.vue';
import compBody from './compEvent/compBody.vue';
import compSettings from './compEvent/compSettings.vue';
import compReport from './compEvent/compReport.vue';
import compFooter from './compEvent/compFooter.vue';
import { getEvent } from '@/services/app/event';
import { useEvents } from '@/store/event';
export default {
    components: { compHeader, compBody, compSettings, compReport, compFooter },
    props: ["event", "eID"],
    data() {
        return {
            slide: "event",
            eventsStore: useEvents(),
            show: false
        }
    },
    methods: {
        openSettings() {
            if (this.slide == "settings")
                this.slide = "event"
            else this.slide = "settings"
        },
        openReport() {
            this.slide = "report"
        },
        loadEvent() {
            getEvent(this.eID).then(event => {
                this.eventsStore.dict[this.eID].eID = this.eID
                this.eventsStore.dict[this.eID].data = event.data
                this.show = true;
            })
        }
    },
    mounted() {
        if (this.event.data) this.show = true
        else this.loadEvent()
    },
    computed: {
        icon() {
            return this.slide == "settings" ? "celebration" : "more_vert"
        }
    }
}
</script>
<style>
.event {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}
</style>