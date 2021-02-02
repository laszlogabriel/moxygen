# {{kind}} `{{name}}` {{anchor refid}}

{{briefdescription}}

{{detaileddescription}}

## Summary

Members | Summary
--- | ---
{{#each filtered.members}}{{cell proto}} | {{cell summary}}
{{/each}}{{#each filtered.compounds}}{{cell proto}} | {{cell summary}}
{{/each}}

## Members

{{#each filtered.compounds}}

### {{title proto}} {{anchor refid}}

{{briefdescription}}

{{detaileddescription}}
{{/each}}

{{#each filtered.members}}

### {{title proto}} {{anchor refid}}

{{#if enumvalue}}
Values | Descriptions
--- | ---
{{#each enumvalue}}{{cell name}} | {{cell summary}}
{{/each}}
{{/if}}

{{briefdescription}}

{{detaileddescription}}

{{/each}}
