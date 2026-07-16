import type { Entity } from '@backstage/catalog-model';
import { applicationData, effectiveRole } from './ownership';

const ingestedApplication: Entity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'System',
  metadata: {
    name: 'faisal-tenant-teesttt',
    namespace: 'default',
  },
  spec: {
    type: 'application',
    owners: [{ name: 'group:default/agentic', role: 'admin' }],
  },
};

describe('ingested application ownership', () => {
  it('derives application identity from the canonical namespace', () => {
    expect(applicationData(ingestedApplication)).toMatchObject({
      tenant: 'faisal',
      name: 'teesttt',
      namespace: 'faisal-tenant-teesttt',
    });
  });

  it('matches group ownership emitted by the Kubernetes ingestor', () => {
    expect(effectiveRole(ingestedApplication, ['group:default/agentic'])).toBe('admin');
  });
});
