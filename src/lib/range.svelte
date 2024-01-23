<script lang="ts">
  type $$Props = Partial<Omit<HTMLInputElement, 'value'>> & {
    name: string;
    value: number;
    label: string;
  };

  export let name: string;
  export let value: number;
  export let label: string;
</script>

<div class="space-y-2 w-full">
  <div class="flex justify-between items-center">
    <label for="{name}-range">{label}</label>
    <label for="{name}-input" class="sr-only">{label} Manual Input</label>
    <input
      id="{name}-input"
      type="number"
      {name}
      value={value.toFixed(1)}
      {...$$restProps}
      class="w-fit text-sm"
      on:change
    />
  </div>
  <input id="{name}-range" type="range" {name} {value} {...$$restProps} on:change />
</div>
