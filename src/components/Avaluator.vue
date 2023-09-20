<template>
  <div class="avaluator">
    <ul class="avaluator__levels">
      <li v-for="i in 5" :key="i">
        {{ t(`avalanche.risk.${i}.name`) }}
        <strong>{{ i }}</strong>
      </li>
    </ul>
    <div class="avaluator__grid">
      <img src="/images/avalanche/avaluator.svg">
      <ul class="avaluator__grid-lines avaluator__grid-lines--v">
        <li v-for="i in 3" :key="i" />
      </ul>
      <ul class="avaluator__grid-lines avaluator__grid-lines--h">
        <li v-for="i in 5" :key="i" />
      </ul>
      <aside class="avaluator__indications not-recommended">
        <h4>{{ t('avalanche.avaluator.not_recommended') }}</h4>
        <p>{{ t('avalanche.avaluator.not_recommended_indications') }}</p>
      </aside>
      <aside class="avaluator__indications extra-caution">
        <h4>{{ t('avalanche.avaluator.extra_caution') }}</h4>
        <p>{{ t('avalanche.avaluator.extra_caution_indications') }}</p>
      </aside>
      <aside class="avaluator__indications caution">
        <h4>{{ t('avalanche.avaluator.caution') }}</h4>
        <p>{{ t('avalanche.avaluator.caution_indications') }}</p>
      </aside>
      <div class="aa" />
      <div v-if="risk" class="avaluator__current" />
    </div>
    <ul class="avaluator__grades">
      <li v-for="grade in GRADES" :key="grade">
        <span :class="grade">{{ t(`grade.${grade}`) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Grade } from '/@/types';

defineProps<{
  risk: number;
}>();

const { t } = useI18n();

const GRADES: Grade[] = ['SIMPLE', 'CHALLENGING', 'COMPLEX'];
</script>

<style lang="scss" scoped>
.avaluator {
  display: inline-grid;
  grid-template-columns: fit-content(1rem) 1fr;
  grid-template-rows: 1fr auto;
  padding: 1rem;
  margin: auto;
  font-size: 1rem;

  &__levels {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    text-align: right;
    margin-right: 0.75em;
    white-space: nowrap;
    font-size: 0.75em;
    color: #888a;

    li {
      display: flex;
      gap: 0.5em;
      align-items: center;
      justify-content: flex-end;
      font-variant-numeric: tabular-nums;
    }

    strong {
      color: var(--color-text);
      font-weight: bold;
      font-size: 1.25em;
    }
  }

  &__grades {
    grid-column: 2 / 4;
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 0.75em;
    font-size: 0.75em;

    li { flex: 1; }

    span {
      display: inline-block;
      background: var(--color);
      color: var(--text);
      padding: 0.5em 1em;
      border-radius: 1em;
    }
  }

  &__grid {
    position: relative;
    max-height: 15em;
    aspect-ratio: 4 / 2.55;
    overflow: hidden;
    border-radius: 0.75em;

    img { display: block; }

    &-lines {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-around;

      &--h { flex-direction: column; }

      li { border: 1px dashed #fff6; }
    }
  }

  &__indications {
    position: absolute;
    margin: 0.5em 1em;
    color: #fff;

    h4 {
      font-weight: bold;
      font-size: 1em;
      margin: 0.5em 0;
    }

    p { font-size: 0.65em; }
  }

  .not-recommended {
    top: 0;
    right: 0;
    text-align: right;
    width: 60%;
  }

  .caution {
    bottom: 0;
    width: 45%;
    opacity: 1;
  }

  .extra-caution {
    bottom: 0;
    right: 0;
    width: 40%;
    text-align: right;
    color: #000;
  }

  &__current {
    --risk: 5;

    display: block;
    border-radius: 0.625em;
    box-shadow:
      0 0 0 15em #0004,
      inset 0 0 0 2px #0005;
    position: absolute;
    width: calc(100% - 0.25em);
    height: calc(20% - 0.25em);
    bottom: calc((v-bind(risk) - 1) * 20% + 0.125em);
    margin: 0 0.125em;
    box-sizing: border-box;
  }
}
</style>
