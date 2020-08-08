import React from 'react';
import { useRandomusicState } from './randomusic-context';
import { EnvelopeCurve } from 'tone';
import RestorableValue from './restorable-value';
import { Time } from 'tone/build/esm/core/type/Units';

export default function Synth(): JSX.Element {
  const [attack, setAttack] = React.useState(new RestorableValue<Time>('8n'));
  const [attackCurve, setAttackCurve] = React.useState<EnvelopeCurve>('linear');
  const [decay, setDecay] = React.useState(new RestorableValue<Time>('16n'));
  const [decayCurve, setDecayCurve] = React.useState<'linear' | 'exponential'>(
    'exponential',
  );
  const [sustain, setSustain] = React.useState(
    new RestorableValue<number>(0.5),
  );
  const [release, setRelease] = React.useState(
    new RestorableValue<Time>('16n'),
  );
  const [releaseCurve, setReleaseCurve] = React.useState<EnvelopeCurve>(
    'exponential',
  );
  const [modulationIndex, setModulationIndex] = React.useState(
    new RestorableValue<number>(2),
  );
  const [error, setError] = React.useState(false);

  const { synth } = useRandomusicState();

  React.useEffect(() => {
    try {
      synth.set({
        envelope: {
          attack: attack.value,
          attackCurve,
          decay: decay.value,
          decayCurve,
          sustain: sustain.value,
          release: release.value,
          releaseCurve,
        },
        modulationIndex: modulationIndex.value,
      });
      setError(false);
    } catch (e) {
      setError(true);
    }
  }, [
    synth,
    attack,
    attackCurve,
    decay,
    decayCurve,
    sustain,
    release,
    releaseCurve,
    modulationIndex,
  ]);

  return (
    <>
      <div>
        <label>Modulation index: </label>
        <input
          type="number"
          value={modulationIndex.value}
          onChange={(event) => {
            setModulationIndex(
              modulationIndex.set(
                event.target.value ? parseFloat(event.target.value) : 0,
              ),
            );
          }}
          onBlur={() => {
            if (error) {
              setModulationIndex(modulationIndex.restore());
              setError(false);
            }
          }}
        ></input>
      </div>

      <div>
        <label>Attack: </label>
        <input
          value={attack.value.toString()}
          onChange={(event) => {
            setAttack(attack.set(event.target.value));
          }}
          onBlur={() => {
            if (error) {
              setAttack(attack.restore());
              setError(false);
            }
          }}
        ></input>
      </div>

      <div>
        <label>Attack curve: </label>
        <select
          onChange={(event) => {
            setAttackCurve(event.target.value as EnvelopeCurve);
          }}
          value={attackCurve as string}
        >
          <option value="linear">linear</option>
          <option value="exponential">exponential</option>
          <option value="sine">sine</option>
          <option value="cosine">cosine</option>
          <option value="ripple">ripple</option>
          <option value="step">step</option>
        </select>
      </div>

      <div>
        <label>Decay: </label>
        <input
          value={decay.value.toString()}
          onChange={(event) => {
            setDecay(decay.set(event.target.value));
          }}
          onBlur={() => {
            if (error) {
              setDecay(attack.restore());
              setError(false);
            }
          }}
        ></input>
      </div>

      <div>
        <label>Decay curve: </label>
        <select
          onChange={(event) => {
            setDecayCurve(event.target.value as 'linear' | 'exponential');
          }}
          value={decayCurve}
        >
          <option value="linear">linear</option>
          <option value="exponential">exponential</option>
        </select>
      </div>

      <div>
        <label>Sustain: </label>
        <input
          type="number"
          value={sustain.value}
          onChange={(event) => {
            setSustain(
              sustain.set(
                event.target.value ? parseFloat(event.target.value) : 0,
              ),
            );
          }}
          onBlur={() => {
            if (error) {
              setSustain(sustain.restore());
              setError(false);
            }
          }}
        ></input>
      </div>

      <div>
        <label>Release: </label>
        <input
          value={release.value.toString()}
          onChange={(event) => {
            setRelease(release.set(event.target.value));
          }}
          onBlur={() => {
            if (error) {
              setRelease(release.restore());
              setError(false);
            }
          }}
        ></input>
      </div>

      <div>
        <label>Release curve: </label>
        <select
          onChange={(event) => {
            setReleaseCurve(event.target.value as EnvelopeCurve);
          }}
          value={releaseCurve as string}
        >
          <option value="linear">linear</option>
          <option value="exponential">exponential</option>
          <option value="sine">sine</option>
          <option value="cosine">cosine</option>
          <option value="ripple">ripple</option>
          <option value="step">step</option>
        </select>
      </div>

      {error && (
        <p>
          Current edited value is wrong and will be reverted to last correct
          one.
        </p>
      )}
    </>
  );
}
