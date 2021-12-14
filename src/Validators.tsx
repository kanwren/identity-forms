type NonEmpty<T> = [T, ...T[]];
type Result<E, A> = { _tag: "err"; value: E; } | { _tag: "ok"; value: A; };

function err<E>(e: E): Result<E, never> { return { _tag: "err", value: e } }
function ok<A>(v: A): Result<never, A> { return { _tag: "ok", value: v } }

export function mapErr<E1, E2, A>(r: Result<E1, A>, f: (e: E1) => E2): Result<E2, A> {
    if (r._tag === "ok") {
        return ok(r.value);
    } else {
        return err(f(r.value));
    }
}

export function bind<E, A, B>(r1: Result<E, A>, k: (val: A) => Result<E, B>): Result<E, B> {
    if (r1._tag === "ok") {
        return k(r1.value);
    } else {
        return err(r1.value);
    }
}

type Validator = (input: string) => Result<string, undefined>;

export const requireNonempty: Validator = (input: string) => {
    if (input === "") {
        return err("Required field");
    }
    return ok(undefined);
}

export function requireLength(lo: number, hi: number): Validator {
    return (input: string) => {
        if (input.length < lo) {
            return err("Must be at least " + lo + " characters");
        } else if (input.length > hi) {
            return err("Must be less than " + hi + " characters");
        } else {
            return ok(undefined);
        }
    }
}

export function requirePred(pred: (c: string) => boolean): (input: string) => Result<string, undefined> {
    return (input) => {
        for (const c of input) {
            if (!pred(c)) {
                return err("Disallowed character: " + JSON.stringify(c));
            }
        }
        return ok(undefined);
    };
}

export const requireLetters: Validator = (name: string) => {
    return mapErr(
        requirePred((c: string) => /[\p{L} ]/u.test(c))(name),
        () => "Only letters and spaces allowed",
    );
}

export const requireAscii: Validator = (name: string) => {
    return mapErr(
        requirePred((c: string) => {
            let cp = c.codePointAt(0)
            return cp !== undefined && cp <= 127;
        })(name),
        () => "Invalid characters",
    );
}

export const requireNoSpace: Validator = (input: string) => {
    if (/\s/.test(input)) {
        return err("May not contain spaces");
    }
    return ok(undefined);
}

export function all(validators: NonEmpty<(input: string) => Result<string, undefined>>): Validator {
    return (input: string) => {
        let res = validators[0](input);
        if (res._tag === "err") {
            return res;
        }
        for (let i = 1; i < validators.length; i++) {
            let x = validators[i](input);
            if (x._tag === "err") {
                return x;
            }
        }
        return ok(undefined);
    }
}

export function validate(validator: Validator, input: string | undefined): string | undefined {
    if (input === undefined) {
        return undefined;
    } else {
        return validator(input).value;
    }
}

export function anyMissing(results: ([string | undefined, string | undefined])[]): boolean {
    for (const [input, e] of results) {
        if (input === undefined || e !== undefined) {
            return true;
        }
    }
    return false;
}

export function allMissing(results: ([string | undefined, string | undefined])[]): boolean {
    for (const [input, e] of results) {
        if (input !== undefined && e === undefined) {
            return false;
        }
    }
    return true;
}